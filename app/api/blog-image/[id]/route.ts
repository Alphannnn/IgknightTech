/**
 * Serves blog featured-image bytes stored in Postgres.
 *
 * Public route — no auth gate. Each row is content-addressable by id, and
 * we tell the browser + Vercel's edge cache to keep it forever, so each
 * image only hits the DB once. If you ever need to replace an image,
 * upload a new one and change the BlogPost.image URL — old IDs stay valid.
 */
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;

  const row = await db.blogImage.findUnique({
    where: { id },
    select: { mime: true, data: true },
  });

  if (!row) {
    return new Response("Image not found", { status: 404 });
  }

  // Prisma Bytes column comes back as Uint8Array — Response accepts it directly.
  return new Response(new Uint8Array(row.data), {
    status: 200,
    headers: {
      "Content-Type": row.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": row.data.length.toString(),
    },
  });
}
