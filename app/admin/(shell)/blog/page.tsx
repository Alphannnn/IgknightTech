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
} from "lucide-react";

type SP = Promise<{ status?: string }>;

export default async function AdminBlogPage({ searchParams }: { searchParams: SP }) {
  await requireAdmin();
  const { status: statusFilter } = await searchParams;

  const posts = await listAllPosts();

  // Optional filter from URL: ?status=published|draft
  const filtered =
    statusFilter === "published" || statusFilter === "draft"
      ? posts.filter((p) => p.status === statusFilter)
      : posts;

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  return (
    <div className="admin-page-in space-y-7">

      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Content
          </div>
          <h1 className="mt-1 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Blog
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Write, edit, publish. {counts.all} total · {counts.published} published · {counts.draft} drafts.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_4px_16px_-4px_rgba(15,23,42,0.3)]"
        >
          <Plus className="w-4 h-4" />
          New post
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip href="/admin/blog"               label="All"        count={counts.all}       active={!statusFilter} />
        <FilterChip href="/admin/blog?status=published" label="Published" count={counts.published} active={statusFilter === "published"} />
        <FilterChip href="/admin/blog?status=draft"     label="Drafts"   count={counts.draft}     active={statusFilter === "draft"} />
      </div>

      {/* List */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-slate-900 text-base font-bold">No posts here.</p>
            <p className="mt-1 text-slate-500 text-sm">
              {statusFilter ? "Try removing the filter." : "Get started with a new draft."}
            </p>
            <Link
              href="/admin/blog/new"
              className="mt-5 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" />
              New post
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((p) => (
              <li
                key={p.id}
                className="group relative px-5 sm:px-6 py-4 hover:bg-slate-50/60 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300"
                  style={{ background: p.categoryColor }}
                />
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_140px_120px_auto] gap-3 lg:gap-6 items-center">

                  {/* Title + author */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
                        style={{
                          background: `${p.categoryColor}14`,
                          borderColor: `${p.categoryColor}40`,
                          color: p.categoryColor,
                        }}
                      >
                        <span aria-hidden="true" className="w-1 h-1 rounded-full" style={{ background: p.categoryColor }} />
                        {p.category}
                      </span>
                      {p.status === "published" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                      {p.featured && (
                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.16em] bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/admin/blog/${p.slug}`}
                      className="mt-1.5 block text-slate-900 text-sm sm:text-[15px] font-bold tracking-tight leading-snug hover:text-slate-700 transition-colors"
                    >
                      {p.title}
                    </Link>
                    <div className="mt-1 text-slate-500 text-xs truncate font-mono">
                      /resources/blog/{p.slug} · {p.author}
                    </div>
                  </div>

                  <div className="text-slate-700 text-sm font-medium tabular-nums">
                    {p.date}
                  </div>

                  <div className="text-slate-500 text-xs">
                    {p.readTime}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <form action={togglePostStatusAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        title={p.status === "published" ? "Switch to draft" : "Publish"}
                        aria-label={p.status === "published" ? "Switch to draft" : "Publish"}
                        className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all"
                      >
                        {p.status === "published" ? (
                          <EyeOff className="w-4 h-4 text-slate-500 group-hover:text-amber-600 transition-colors" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                        )}
                      </button>
                    </form>
                    <Link
                      href={`/resources/blog/${p.slug}`}
                      target="_blank"
                      title="Open public page"
                      className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-900 transition-colors" />
                    </Link>
                    <Link
                      href={`/admin/blog/${p.slug}`}
                      title="Edit"
                      className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-blue-50 flex items-center justify-center transition-all"
                    >
                      <Pencil className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </Link>
                    <ConfirmDeleteButton id={p.id} label={p.title} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function FilterChip({
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
      className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900"
      }`}
    >
      {label}
      <span
        className={`font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/15 text-white/85" : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

