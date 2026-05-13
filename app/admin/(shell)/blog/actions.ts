"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify, type BodySection } from "@/lib/blog";

export type SavePostState = {
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

function parseBody(raw: string): BodySection[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((s): s is BodySection => typeof s === "object" && s !== null)
      .map((s) => ({
        heading: typeof s.heading === "string" && s.heading.trim() ? s.heading.trim() : undefined,
        paragraphs: Array.isArray(s.paragraphs)
          ? s.paragraphs
              .filter((p: unknown): p is string => typeof p === "string")
              .map((p: string) => p.trim())
              .filter((p: string) => p.length > 0)
          : [],
      }))
      .filter((s) => s.heading || s.paragraphs.length > 0);
  } catch {
    return [];
  }
}

function fieldString(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Single save action — create if id is empty, otherwise update.
 * Re-renders the form with `error` / `fieldErrors` on validation failure.
 */
export async function savePostAction(
  _prev: SavePostState,
  formData: FormData
): Promise<SavePostState> {
  await requireAdmin();

  const id          = fieldString(formData, "id");
  const slugInput   = fieldString(formData, "slug");
  const title       = fieldString(formData, "title");
  const excerpt     = fieldString(formData, "excerpt");
  const category    = fieldString(formData, "category");
  const categoryColor = fieldString(formData, "categoryColor");
  const author      = fieldString(formData, "author");
  const authorRole  = fieldString(formData, "authorRole");
  const avatarFrom  = fieldString(formData, "avatarFrom");
  const avatarTo    = fieldString(formData, "avatarTo");
  const dateInput   = fieldString(formData, "date"); // yyyy-mm-dd
  const readTime    = fieldString(formData, "readTime");
  const image       = fieldString(formData, "image");
  const featured    = formData.get("featured") === "on";
  const status      = fieldString(formData, "status") === "draft" ? "draft" : "published";
  const bodyRaw     = fieldString(formData, "bodyJson");

  // Validate
  const fieldErrors: Record<string, string> = {};
  if (!title) fieldErrors.title = "Title is required.";
  if (!excerpt) fieldErrors.excerpt = "Excerpt is required.";
  if (!category) fieldErrors.category = "Category is required.";
  if (!/^#[0-9a-fA-F]{6}$/.test(categoryColor)) {
    fieldErrors.categoryColor = "Category color must be a hex like #7BB6FF.";
  }
  if (!author) fieldErrors.author = "Author is required.";
  if (!authorRole) fieldErrors.authorRole = "Author role is required.";
  if (!/^#[0-9a-fA-F]{6}$/.test(avatarFrom)) fieldErrors.avatarFrom = "Hex required.";
  if (!/^#[0-9a-fA-F]{6}$/.test(avatarTo)) fieldErrors.avatarTo = "Hex required.";
  if (!dateInput) fieldErrors.date = "Date is required.";
  if (!readTime) fieldErrors.readTime = "Read time is required.";

  const slug = (slugInput || slugify(title)).trim();
  if (!slug) fieldErrors.slug = "Slug is required.";
  else if (!/^[a-z0-9-]+$/.test(slug)) fieldErrors.slug = "Slug must be lowercase letters, digits, and dashes only.";

  const body = parseBody(bodyRaw);
  if (body.length === 0) fieldErrors.body = "Add at least one body section.";

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    return { error: "Invalid date.", fieldErrors: { date: "Invalid date." } };
  }

  // Slug uniqueness — only fail if a *different* post owns it
  const existingSlug = await db.blogPost.findUnique({ where: { slug } });
  if (existingSlug && existingSlug.id !== id) {
    return {
      error: "Another post already uses that slug.",
      fieldErrors: { slug: "Slug is already taken." },
    };
  }

  const data = {
    slug,
    title,
    excerpt,
    category,
    categoryColor,
    author,
    authorRole,
    avatarFrom,
    avatarTo,
    date,
    readTime,
    image: image || null,
    featured,
    body: JSON.stringify(body),
    status,
  };

  let savedSlug: string;
  if (id) {
    const updated = await db.blogPost.update({
      where: { id },
      data,
      select: { slug: true },
    });
    savedSlug = updated.slug;
  } else {
    const created = await db.blogPost.create({
      data,
      select: { slug: true },
    });
    savedSlug = created.slug;
  }

  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/resources");
  revalidatePath(`/resources/blog/${savedSlug}`);

  redirect(`/admin/blog?saved=${savedSlug}`);
}

/** Form action: hard-delete a post by id. */
export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = fieldString(formData, "id");
  if (!id) return;
  await db.blogPost.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/resources");
}

/** Form action: flip a post's status between draft and published. */
export async function togglePostStatusAction(formData: FormData) {
  await requireAdmin();
  const id = fieldString(formData, "id");
  if (!id) return;
  const post = await db.blogPost.findUnique({ where: { id }, select: { status: true, slug: true } });
  if (!post) return;
  const next = post.status === "published" ? "draft" : "published";
  await db.blogPost.update({ where: { id }, data: { status: next } });
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/resources");
  revalidatePath(`/resources/blog/${post.slug}`);
}
