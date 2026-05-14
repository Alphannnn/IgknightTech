import { NextRequest, NextResponse } from "next/server";
import { USER_SESSION_COOKIE_NAME } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const next = url.searchParams.get("next") || "/";
  const dest = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  const res = NextResponse.redirect(new URL(dest, url.origin), { status: 303 });
  res.cookies.delete(USER_SESSION_COOKIE_NAME);
  return res;
}
