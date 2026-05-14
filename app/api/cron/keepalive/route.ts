/**
 * Keep-alive endpoint. Hits the Postgres compute on Neon so it doesn't suspend
 * (the free tier sleeps after ~5 min idle, costing 500ms-2s on the next real
 * request). Designed to be poked every few minutes by:
 *   - Vercel cron (see vercel.json), or
 *   - An external cron service like cron-job.org if Vercel cron isn't available.
 *
 * Auth: requires `?token=<CRON_SECRET>` matching the CRON_SECRET env var, or
 * the standard `Authorization: Bearer <CRON_SECRET>` header (used by Vercel
 * cron automatically). Without it, returns 401.
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET not configured." },
      { status: 500 },
    );
  }

  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (token !== expected && bearer !== expected) {
    return new NextResponse(null, { status: 401 });
  }

  // Tiny query — just enough to keep the Neon compute warm.
  await db.$queryRaw`SELECT 1`;

  return NextResponse.json(
    { ok: true, at: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
