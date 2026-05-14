/**
 * Admin session — HMAC-signed cookie payload.
 *
 * The cookie value has the form `<base64url(payload)>.<base64url(signature)>`.
 * The payload is `{ sub: "admin", iat: number, exp: number }`. The signature is
 * an HMAC-SHA-256 over the payload using SESSION_SECRET.
 *
 * Web Crypto is used so this works in both Node and the Edge runtime
 * (middleware).
 */

const ALGORITHM = { name: "HMAC", hash: "SHA-256" } as const;
const TOKEN_TTL_SECONDS = 60 * 60 * 12; // 12 hours
const USER_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
export const SESSION_COOKIE_NAME = "admin_session";
export const USER_SESSION_COOKIE_NAME = "user_session";

type AdminPayload = {
  sub: "admin";
  iat: number;
  exp: number;
};

type UserPayload = {
  sub: "user";
  uid: string;
  iat: number;
  exp: number;
};

type SessionPayload = AdminPayload;

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "SESSION_SECRET is missing or too short. Set it in .env (>= 16 chars)."
    );
  }
  return s;
}

function toBase64Url(bytes: Uint8Array): string {
  let str = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importKey(secret: string): Promise<CryptoKey> {
  const keyData = new TextEncoder().encode(secret);
  return crypto.subtle.importKey("raw", keyData, ALGORITHM, false, [
    "sign",
    "verify",
  ]);
}

async function sign(payloadBytes: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
  const sig = await crypto.subtle.sign(ALGORITHM, key, payloadBytes as BufferSource);
  return new Uint8Array(sig);
}

export async function createSessionToken(): Promise<{ token: string; maxAge: number }> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: "admin",
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  };
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const key = await importKey(getSecret());
  const sig = await sign(payloadBytes, key);

  const token = `${toBase64Url(payloadBytes)}.${toBase64Url(sig)}`;
  return { token, maxAge: TOKEN_TTL_SECONDS };
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  const payload = await verifyAnyToken(token);
  if (!payload || payload.sub !== "admin") return null;
  return payload;
}

export async function createUserSessionToken(
  userId: string,
): Promise<{ token: string; maxAge: number }> {
  const now = Math.floor(Date.now() / 1000);
  const payload: UserPayload = {
    sub: "user",
    uid: userId,
    iat: now,
    exp: now + USER_TOKEN_TTL_SECONDS,
  };
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const key = await importKey(getSecret());
  const sig = await sign(payloadBytes, key);

  const token = `${toBase64Url(payloadBytes)}.${toBase64Url(sig)}`;
  return { token, maxAge: USER_TOKEN_TTL_SECONDS };
}

export async function verifyUserSessionToken(
  token: string | undefined | null,
): Promise<UserPayload | null> {
  const payload = await verifyAnyToken(token);
  if (!payload || payload.sub !== "user") return null;
  return payload;
}

async function verifyAnyToken(
  token: string | undefined | null,
): Promise<AdminPayload | UserPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  try {
    const payloadBytes = fromBase64Url(parts[0]);
    const sigBytes = fromBase64Url(parts[1]);
    const key = await importKey(getSecret());

    const valid = await crypto.subtle.verify(
      ALGORITHM,
      key,
      sigBytes as BufferSource,
      payloadBytes as BufferSource,
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as
      | AdminPayload
      | UserPayload;
    if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
