import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  createUserSessionToken,
  USER_SESSION_COOKIE_NAME,
} from "@/lib/session";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { name?: unknown; email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!name || name.length > 200) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const user = await db.user.upsert({
    where: { email },
    create: { email, name },
    update: { name },
    select: { id: true, email: true, name: true, image: true },
  });

  const { token, maxAge } = await createUserSessionToken(user.id);

  const res = NextResponse.json({ ok: true, user });
  res.cookies.set(USER_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  return res;
}
