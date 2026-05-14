import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse(null, { status: 401 });
  }

  const latest = await db.meeting.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  return NextResponse.json(
    { ts: latest?.updatedAt.getTime() ?? 0 },
    { headers: { "Cache-Control": "no-store" } },
  );
}
