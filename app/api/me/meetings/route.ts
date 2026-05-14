import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const meetings = await db.meeting.findMany({
    where: { email: user.email },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      meetingType: true,
      date: true,
      timeSlot: true,
      status: true,
      company: true,
      message: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(
    {
      user: { name: user.name, email: user.email, image: user.image },
      meetings,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
