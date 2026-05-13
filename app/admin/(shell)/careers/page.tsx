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
} from "lucide-react";

const DEPT_COLOR: Record<string, string> = {
  Engineering: "#7BB6FF",
  Design:      "#F472B6",
  Product:     "#A78BFA",
  Operations:  "#34D399",
};

export default async function AdminCareersPage() {
  await requireAdmin();

  const roles = await listAllRoles();

  const counts = {
    all: roles.length,
    active: roles.filter((r) => r.active).length,
    hidden: roles.filter((r) => !r.active).length,
    featured: roles.filter((r) => r.featured).length,
  };

  const byDept = roles.reduce<Record<string, number>>((acc, r) => {
    if (!r.active) return acc;
    acc[r.dept] = (acc[r.dept] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="admin-page-in space-y-7">

      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Content
          </div>
          <h1 className="mt-1 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Careers
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            {counts.all} total · {counts.active} active · {counts.hidden} hidden · {counts.featured} featured.
          </p>
        </div>
        <Link
          href="/admin/careers/new"
          className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_4px_16px_-4px_rgba(15,23,42,0.3)]"
        >
          <Plus className="w-4 h-4" />
          New role
        </Link>
      </div>

      {/* Stat strip — count by department (active only) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["Engineering", "Design", "Product", "Operations"] as const).map((dept) => {
          const color = DEPT_COLOR[dept] ?? "#94a3b8";
          const n = byDept[dept] ?? 0;
          return (
            <div key={dept} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {dept}
              </div>
              <div className="mt-2 text-slate-900 text-2xl sm:text-3xl font-extrabold tabular-nums">
                {n}
              </div>
              <div className="text-slate-500 text-xs">
                active {n === 1 ? "role" : "roles"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Roles list */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-slate-900 text-base font-bold tracking-tight">
              All roles
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Inactive roles are dimmed and hidden from /careers.
            </p>
          </div>
        </div>

        {roles.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-slate-900 text-base font-bold">No roles yet.</p>
            <p className="mt-1 text-slate-500 text-sm">Add your first open role.</p>
            <Link
              href="/admin/careers/new"
              className="mt-5 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" />
              New role
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {roles.map((r) => {
              const color = DEPT_COLOR[r.dept] ?? "#94a3b8";
              return (
                <li
                  key={r.id}
                  className={`group relative px-5 sm:px-6 py-4 transition-colors ${
                    r.active ? "hover:bg-slate-50/60" : "bg-slate-50/40 hover:bg-slate-50/80"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300"
                    style={{ background: color }}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_140px_140px_120px_auto] gap-3 lg:gap-6 items-center">

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
                          style={{
                            background: `${color}14`,
                            borderColor: `${color}40`,
                            color,
                          }}
                        >
                          <span aria-hidden="true" className="w-1 h-1 rounded-full" style={{ background: color }} />
                          {r.dept}
                        </span>
                        {r.featured && (
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.16em] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                        {r.active ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full">
                            <Eye className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                            <EyeOff className="w-3 h-3" /> Hidden
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/admin/careers/${r.id}`}
                        className={`mt-1.5 block text-sm sm:text-[15px] font-bold tracking-tight leading-snug transition-colors ${
                          r.active ? "text-slate-900 hover:text-slate-700" : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        {r.title}
                      </Link>
                    </div>

                    <div className="text-slate-700 text-xs sm:text-sm">
                      {r.location}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {r.type}
                    </div>
                    <div className="text-slate-500 text-xs tabular-nums">
                      Posted {r.postedRelative}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <form action={toggleRoleActiveAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          type="submit"
                          title={r.active ? "Hide role" : "Activate role"}
                          aria-label={r.active ? "Hide role" : "Activate role"}
                          className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all"
                        >
                          {r.active ? (
                            <EyeOff className="w-4 h-4 text-slate-500 group-hover:text-amber-600 transition-colors" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                          )}
                        </button>
                      </form>
                      <Link
                        href={`/admin/careers/${r.id}`}
                        title="Edit"
                        className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-blue-50 flex items-center justify-center transition-all"
                      >
                        <Pencil className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      </Link>
                      <ConfirmDeleteRoleButton id={r.id} label={r.title} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
