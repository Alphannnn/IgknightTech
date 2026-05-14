/**
 * Admin image upload endpoint — DB-backed.
 *
 *   POST  Accepts `multipart/form-data` with a single `file` field.
 *         Validates auth + MIME + size, stores bytes in `BlogImage`,
 *         returns `{ url, id, mime, size }`. The returned URL is a
 *         relative path (`/api/blog-image/<id>`) which the BlogPost.image
 *         column persists unchanged.
 *
 *   GET   Diagnostic — used by the UI for a preflight so config issues
 *         (auth expiry, DB unreachable) surface as readable JSON instead
 *         of a generic browser error.
 *
 * No external service required: bytes live in Postgres, served from
 * `/api/blog-image/[id]` with `Cache-Control: public, max-age=31536000,
 * immutable` so Vercel's edge cache absorbs all repeat traffic.
 */
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

// 4 MB — sits comfortably under Vercel's 4.5 MB serverless body limit.
const MAX_BYTES = 4 * 1024 * 1024;

/* ─────────────────────────────────────────────────────────────
   GET — preflight diagnostic.
   ───────────────────────────────────────────────────────────── */
export async function GET(): Promise<NextResponse> {
  const authed = await isAdmin();
  if (!authed) {
    return NextResponse.json(
      {
        ok: false,
        reason: "unauthorized",
        message: "Your admin session has expired. Reload the page and sign in again.",
      },
      { status: 401 },
    );
  }
  return NextResponse.json({ ok: true });
}

/* ─────────────────────────────────────────────────────────────
   POST — upload.
   ───────────────────────────────────────────────────────────── */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const authed = await isAdmin();
  if (!authed) {
    return NextResponse.json(
      {
        ok: false,
        reason: "unauthorized",
        message: "Your admin session has expired. Reload and sign in again.",
      },
      { status: 401 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        reason: "bad_request",
        message: "Expected multipart/form-data with a `file` field.",
      },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        ok: false,
        reason: "missing_file",
        message: "No file was attached.",
      },
      { status: 400 },
    );
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      {
        ok: false,
        reason: "bad_type",
        message: `Unsupported file type (${file.type || "unknown"}). Use JPG, PNG, WebP, AVIF, or GIF.`,
      },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return NextResponse.json(
      {
        ok: false,
        reason: "too_large",
        message: `File is ${mb} MB — max is 4 MB.`,
      },
      { status: 413 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      {
        ok: false,
        reason: "empty",
        message: "That file is empty.",
      },
      { status: 400 },
    );
  }

  // Read bytes off the Web `File` (Node-runtime-friendly), persist.
  const buf = Buffer.from(await file.arrayBuffer());

  const created = await db.blogImage.create({
    data: {
      mime: file.type,
      size: file.size,
      data: buf,
    },
    select: { id: true, mime: true, size: true },
  });

  return NextResponse.json({
    ok: true,
    id: created.id,
    mime: created.mime,
    size: created.size,
    url: `/api/blog-image/${created.id}`,
  });
}
