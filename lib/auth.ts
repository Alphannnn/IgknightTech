/**
 * Server-side admin auth helpers — used by Server Actions and Server
 * Components inside the /admin tree. Reads the signed session cookie set
 * by /admin/login.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
} from "./session";

/** True iff the request carries a valid admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  return Boolean(payload);
}

/** Use at the top of any admin page / action. Redirects to login on failure. */
export async function requireAdmin(): Promise<void> {
  const ok = await isAdmin();
  if (!ok) redirect("/admin/login");
}

/**
 * Constant-time-ish string comparison. Not perfectly constant-time across
 * lengths but good enough for an admin password compare.
 */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Check a submitted password against ADMIN_PASSWORD. */
export function checkAdminPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(submitted, expected);
}

/** Set the signed session cookie. Call after a successful login. */
export async function setAdminSession(): Promise<void> {
  const { token, maxAge } = await createSessionToken();
  const c = await cookies();
  c.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

/** Clear the session cookie. */
export async function clearAdminSession(): Promise<void> {
  const c = await cookies();
  c.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
