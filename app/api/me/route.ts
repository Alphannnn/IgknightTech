import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/user-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }
  return NextResponse.json(
    { user: { name: user.name, email: user.email, image: user.image } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
