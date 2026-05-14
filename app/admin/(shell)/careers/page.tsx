import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listAllRoles } from "@/lib/careers";
import { toggleRoleActiveAction } from "./actions";
import ConfirmDeleteRoleButton from "./ConfirmDeleteRoleButton";
import {
  Pencil,
  Plus,
  Eye,
  EyeOff,
  Briefcase,
} from "lucide-react";

type SP = Promise<{ status?: string; dept?: string }>;

const DEPT_COLOR: Record<string, string> = {
  Engineering: "#2783ED",
  Design:      "#F472B6",
  Product:     "#8B5CF6",
  Operations:  "#22D3EE",
};
const KNOWN_DEPTS = ["Engineering", "Design", "Product", "Operations"] as const;

export default async function AdminCareersPage({ searchParams }: { searchParams: SP }) {
  await requireAdmin();
  const { status: statusFilter, dept: deptFilter } = await searchParams;

  const allRoles = await listAllRoles();

  // Apply optional filters from URL
  let filtered = allRoles;
  if (statusFilter === "active") filtered = filtered.filter((r) => r.active);
  else if (statusFilter === "hidden") filtered = filtered.filter((r) => !r.active);
  if (deptFilter && KNOWN_DEPTS.includes(deptFilter as (typeof KNOWN_DEPTS)[number])) {
    filtered = filtered.filter((r) => r.dept === deptFilter);
  }

  const counts = {
    all: allRoles.length,
    active: allRoles.filter((r) => r.active).length,
    hidden: allRoles.filter((r) => !r.active).length,
    featured: allRoles.filter((r) => r.featured).length,
  };

  const byDept = allRoles.reduce<Record<string, number>>((acc, r) => {
    if (!r.active) return acc;
    acc[r.dept] = (acc[r.dept] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="admin-page-in space-y-6">

      {/* ─────────── Page header ─────────── */}
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Hiring
          </div>
          <h1 className="mt-1.5 text-slate-900 text-3xl font-bold tracking-tight">
            Careers
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            {counts.all} {counts.all === 1 ? "role" : "roles"} ·{" "}
            <span className="text-slate-700 font-medium">{counts.active}</span> active ·{" "}
            <span className="text-slate-700 font-medium">{counts.hidden}</span> hidden
            {counts.featured > 0 && (
              <> · <span className="text-slate-700 font-medium">{counts.featured}</span> featured</>
            )}
          </p>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2.4} />
          New role
        </Link>
      </header>

      {/* ─────────── Filter tabs ─────────── */}
      <nav className="flex items-center gap-1 border-b border-slate-200 -mb-px overflow-x-auto">
        <FilterTab href="/admin/careers" label="All" count={counts.all} active={!statusFilter && !deptFilter} />
        <FilterTab href="/admin/careers?status=active" label="Active" count={counts.active} active={statusFilter === "active"} />
        <FilterTab href="/admin/careers?status=hidden" label="Hidden" count={counts.hidden} active={statusFilter === "hidden"} />
        <span aria-hidden="true" className="mx-1 w-px h-5 bg-slate-200 self-center" />
        {KNOWN_DEPTS.map((d) => {
          const n = byDept[d] ?? 0;
          return (
            <FilterTab
              key={d}
              href={`/admin/careers?dept=${d}`}
              label={d}
              count={n}
              active={deptFilter === d}
              dotColor={DEPT_COLOR[d]}
            />
          );
        })}
      </nav>

      {/* ─────────── Table ─────────── */}
      <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">

        {/* Column headers — desktop only */}
        {filtered.length > 0 && (
          <div className="hidden lg:grid grid-cols-[1fr_140px_160px_120px_180px] gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50/40">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Role</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Department</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Location</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Posted</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 text-right">Actions</span>
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState filtered={!!(statusFilter || deptFilter)} />
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((r) => (
              <li key={r.id}>
                <RoleRow role={r} />
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
  dotColor,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
  dotColor?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
        active ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {dotColor && (
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dotColor }} />
      )}
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

type Role = Awaited<ReturnType<typeof listAllRoles>>[number];

function RoleRow({ role: r }: { role: Role }) {
  const color = DEPT_COLOR[r.dept] ?? "#94a3b8";

  return (
    <div
      className={`group relative grid grid-cols-1 lg:grid-cols-[1fr_140px_160px_120px_180px] gap-3 lg:gap-4 px-6 py-4 transition-colors ${
        r.active ? "hover:bg-slate-50/60" : "bg-slate-50/30 hover:bg-slate-50/80"
      }`}
    >
      {/* Title column */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          {r.active ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-emerald-500" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-slate-400" />
              Hidden
            </span>
          )}
          {r.featured && (
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.12em] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
              Featured
            </span>
          )}
        </div>

        <Link
          href={`/admin/careers/${r.id}`}
          className={`block text-[14px] font-semibold tracking-tight leading-snug hover:underline transition-colors line-clamp-1 ${
            r.active ? "text-slate-900 hover:text-slate-700" : "text-slate-500"
          }`}
        >
          {r.title}
        </Link>

        <div className="mt-1 text-slate-500 text-xs lg:hidden flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 font-medium"
            style={{ color }}
          >
            <span aria-hidden="true" className="w-1 h-1 rounded-full" style={{ background: color }} />
            {r.dept}
          </span>
          <span className="text-slate-300">·</span>
          <span>{r.location}</span>
          <span className="text-slate-300">·</span>
          <span>{r.type}</span>
        </div>
      </div>

      {/* Department */}
      <div className="hidden lg:flex lg:items-center text-sm">
        <span
          className="inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color }}
        >
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          {r.dept}
        </span>
      </div>

      {/* Location */}
      <div className="hidden lg:flex lg:items-center text-slate-700 text-sm">
        <div className="min-w-0">
          <div className="truncate">{r.location}</div>
          <div className="text-slate-400 text-xs">{r.type}</div>
        </div>
      </div>

      {/* Posted */}
      <div className="hidden lg:flex lg:items-center text-slate-500 text-sm tabular-nums">
        {r.postedRelative}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 lg:justify-end">
        <form action={toggleRoleActiveAction}>
          <input type="hidden" name="id" value={r.id} />
          <button
            type="submit"
            title={r.active ? "Hide role" : "Activate role"}
            aria-label={r.active ? "Hide role" : "Activate role"}
            className="group/btn w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            {r.active ? (
              <EyeOff className="w-4 h-4 text-slate-500 group-hover/btn:text-amber-600 transition-colors" strokeWidth={1.8} />
            ) : (
              <Eye className="w-4 h-4 text-slate-500 group-hover/btn:text-emerald-600 transition-colors" strokeWidth={1.8} />
            )}
          </button>
        </form>
        <Link
          href={`/admin/careers/${r.id}`}
          title="Edit"
          aria-label="Edit"
          className="group/btn w-8 h-8 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors"
        >
          <Pencil className="w-4 h-4 text-slate-500 group-hover/btn:text-blue-600 transition-colors" strokeWidth={1.8} />
        </Link>
        <ConfirmDeleteRoleButton id={r.id} label={r.title} />
      </div>
    </div>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
        <Briefcase className="w-5 h-5 text-slate-400" strokeWidth={1.8} />
      </div>
      <p className="text-slate-900 text-sm font-semibold">
        {filtered ? "No roles match this filter." : "No roles yet."}
      </p>
      <p className="mt-1 text-slate-500 text-sm">
        {filtered ? "Try clearing the filter or pick a different one." : "Add your first open role."}
      </p>
      <Link
        href={filtered ? "/admin/careers" : "/admin/careers/new"}
        className="mt-5 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
      >
        {filtered ? "Clear filters" : (
          <>
            <Plus className="w-4 h-4" strokeWidth={2.4} />
            New role
          </>
        )}
      </Link>
    </div>
  );
}
