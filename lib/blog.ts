/**
 * Blog data layer — server-only helpers and types.
 *
 * Public reads are exported here (no auth required). Mutations live in
 * `app/admin/(shell)/blog/actions.ts` and gate on `requireAdmin`.
 *
 * The DB stores `body` as a JSON-encoded string. We parse it once at the
 * boundary into the same `BodySection[]` shape the public pages expect.
 */
import { db } from "./db";

export type BodySection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPostView = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  author: string;
  authorRole: string;
  authorAvatar: { from: string; to: string };
  date: string; // human-readable, e.g. "Mar 18, 2025"
  rawDate: Date;
  readTime: string;
  image?: string | null;
  featured: boolean;
  status: "draft" | "published";
  body: BodySection[];
};

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseBody(raw: string): BodySection[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((s): s is BodySection => typeof s === "object" && s !== null)
      .map((s) => ({
        heading: typeof s.heading === "string" ? s.heading : undefined,
        paragraphs: Array.isArray(s.paragraphs)
          ? s.paragraphs.filter((p: unknown): p is string => typeof p === "string")
          : [],
      }));
  } catch {
    return [];
  }
}

// Use Awaited<ReturnType<...>> to get the Prisma row type without importing
// the generated namespace directly (keeps this file framework-light).
type BlogRow = Awaited<ReturnType<typeof db.blogPost.findFirst>> extends infer T
  ? T extends null
    ? never
    : T
  : never;

function toView(row: BlogRow): BlogPostView {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    categoryColor: row.categoryColor,
    author: row.author,
    authorRole: row.authorRole,
    authorAvatar: { from: row.avatarFrom, to: row.avatarTo },
    date: fmtDate(row.date),
    rawDate: row.date,
    readTime: row.readTime,
    image: row.image,
    featured: row.featured,
    status: row.status === "draft" ? "draft" : "published",
    body: parseBody(row.body),
  };
}

/* ───────────────────────── Reads ───────────────────────── */

/** Public: list all published posts, newest first. */
export async function listPublishedPosts(): Promise<BlogPostView[]> {
  const rows = await db.blogPost.findMany({
    where: { status: "published" },
    orderBy: { date: "desc" },
  });
  return rows.map(toView);
}

/** Admin: list everything regardless of status, newest first. */
export async function listAllPosts(): Promise<BlogPostView[]> {
  const rows = await db.blogPost.findMany({
    orderBy: { date: "desc" },
  });
  return rows.map(toView);
}

/** Get a single post by slug. Returns null if missing. */
export async function getPostBySlug(slug: string): Promise<BlogPostView | null> {
  const row = await db.blogPost.findUnique({ where: { slug } });
  return row ? toView(row) : null;
}

/** Admin: get a single post by internal id. */
export async function getPostById(id: string): Promise<BlogPostView | null> {
  const row = await db.blogPost.findUnique({ where: { id } });
  return row ? toView(row) : null;
}

/* ───────────────────────── Slug helpers ───────────────────────── */

/** Produce a URL-safe slug from a title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
