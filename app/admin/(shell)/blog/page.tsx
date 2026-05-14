import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listAllPosts } from "@/lib/blog";
import { togglePostStatusAction } from "./actions";
import ConfirmDeleteButton from "./ConfirmDeleteButton";
import {
  ExternalLink,
  Pencil,
  Plus,
  Eye,
  EyeOff,
  FilePlus,
} from "lucide-react";

type SP = Promise<{ status?: string }>;

export default async function AdminBlogPage({ searchParams }: { searchParams: SP }) {
  await requireAdmin();
  const { status: statusFilter } = await searchParams;

  const posts = await listAllPosts();

  const filtered =
    statusFilter === "published" || statusFilter === "draft"
      ? posts.filter((p) => p.status === statusFilter)
      : posts;

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    featured: posts.filter((p) => p.featured).length,
  };

  return (
    <div className="admin-page-in space-y-6">

      {/* ─────────── Page header ─────────── */}
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Content
          </div>
          <h1 className="mt-1.5 text-slate-900 text-3xl font-bold tracking-tight">
            Blog
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            {counts.all} {counts.all === 1 ? "post" : "posts"} ·{" "}
            <span className="text-slate-700 font-medium">{counts.published}</span> published ·{" "}
            <span className="text-slate-700 font-medium">{counts.draft}</span> {counts.draft === 1 ? "draft" : "drafts"}
            {counts.featured > 0 && (
              <> · <span className="text-slate-700 font-medium">{counts.featured}</span> featured</>
            )}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2.4} />
          New post
        </Link>
      </header>

      {/* ─────────── Filter tabs (underline style) ─────────── */}
      <nav className="flex items-center gap-1 border-b border-slate-200 -mb-px">
        <FilterTab href="/admin/blog" label="All" count={counts.all} active={!statusFilter} />
        <FilterTab href="/admin/blog?status=published" label="Published" count={counts.published} active={statusFilter === "published"} />
        <FilterTab href="/admin/blog?status=draft" label="Drafts" count={counts.draft} active={statusFilter === "draft"} />
      </nav>

      {/* ─────────── Table ─────────── */}
      <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">

        {/* Column headers — desktop only */}
        {filtered.length > 0 && (
          <div className="hidden lg:grid grid-cols-[1fr_120px_88px_180px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50/40">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Title</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Date</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Read</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 text-right">Actions</span>
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState statusFilter={statusFilter} />
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <li key={p.id}>
                <PostRow post={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* ─────────────────────── Sub-components ─────────────────────── */

function FilterTab({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
        active ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {label}
      <span
        className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] tabular-nums font-semibold transition-colors ${
          active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
      {active && (
        <span
          aria-hidden="true"
          className="absolute left-3 right-3 -bottom-px h-0.5 bg-slate-900 rounded-t-full"
        />
      )}
    </Link>
  );
}

type Post = Awaited<ReturnType<typeof listAllPosts>>[number];

function PostRow({ post: p }: { post: Post }) {
  const isPublished = p.status === "published";

  return (
    <div className="group relative grid grid-cols-1 lg:grid-cols-[1fr_120px_88px_180px] gap-3 lg:gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">

      {/* Title column */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-md"
            style={{
              background: `${p.categoryColor}14`,
              color: p.categoryColor,
            }}
          >
            <span aria-hidden="true" className="w-1 h-1 rounded-full" style={{ background: p.categoryColor }} />
            {p.category}
          </span>
          {isPublished ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-emerald-500" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-amber-500" />
              Draft
            </span>
          )}
          {p.featured && (
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.12em] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
              Featured
            </span>
          )}
        </div>

        <Link
          href={`/admin/blog/${p.slug}`}
          className="block text-slate-900 text-[14px] font-semibold tracking-tight leading-snug hover:text-slate-700 transition-colors line-clamp-1"
        >
          {p.title}
        </Link>

        <div className="mt-1 flex items-center gap-2 text-slate-500 text-xs min-w-0">
          <span className="font-mono text-slate-400 truncate">/{p.slug}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="truncate">{p.author}</span>
        </div>
      </div>

      {/* Date */}
      <div className="lg:flex lg:items-center text-slate-700 text-sm tabular-nums">
        <span className="lg:hidden text-slate-400 text-xs mr-2">Date:</span>
        {p.date}
      </div>

      {/* Read time */}
      <div className="lg:flex lg:items-center text-slate-500 text-sm">
        <span className="lg:hidden text-slate-400 text-xs mr-2">Read:</span>
        {p.readTime}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 lg:justify-end">
        <form action={togglePostStatusAction}>
          <input type="hidden" name="id" value={p.id} />
          <button
            type="submit"
            title={isPublished ? "Switch to draft" : "Publish"}
            aria-label={isPublished ? "Switch to draft" : "Publish"}
            className="group/btn w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            {isPublished ? (
              <EyeOff className="w-4 h-4 text-slate-500 group-hover/btn:text-amber-600 transition-colors" strokeWidth={1.8} />
            ) : (
              <Eye className="w-4 h-4 text-slate-500 group-hover/btn:text-emerald-600 transition-colors" strokeWidth={1.8} />
            )}
          </button>
        </form>
        <Link
          href={`/resources/blog/${p.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Open public page"
          aria-label="Open public page"
          className="group/btn w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover/btn:text-slate-900 transition-colors" strokeWidth={1.8} />
        </Link>
        <Link
          href={`/admin/blog/${p.slug}`}
          title="Edit"
          aria-label="Edit"
          className="group/btn w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors"
        >
          <Pencil className="w-4 h-4 text-slate-500 group-hover/btn:text-blue-600 transition-colors" strokeWidth={1.8} />
        </Link>
        <ConfirmDeleteButton id={p.id} label={p.title} />
      </div>
    </div>
  );
}

function EmptyState({ statusFilter }: { statusFilter?: string }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
        <FilePlus className="w-5 h-5 text-slate-400" strokeWidth={1.8} />
      </div>
      <p className="text-slate-900 text-sm font-semibold">No posts here.</p>
      <p className="mt-1 text-slate-500 text-sm">
        {statusFilter ? "Try removing the filter." : "Get started with a new draft."}
      </p>
      <Link
        href="/admin/blog/new"
        className="mt-5 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" strokeWidth={2.4} />
        New post
      </Link>
    </div>
  );
}
