"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, Sparkles } from "lucide-react";
import { saveRoleAction, type SaveRoleState } from "./actions";
import { VALID_DEPTS, VALID_TYPES } from "@/lib/careers-constants";

export type RoleFormInitial = {
  id?: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  /** yyyy-mm-dd */
  posted: string;
  featured: boolean;
  active: boolean;
};

const initialActionState: SaveRoleState = {};

export default function RoleForm({ initial }: { initial: RoleFormInitial }) {
  const [state, action, pending] = useActionState(saveRoleAction, initialActionState);
  const errors = state.fieldErrors ?? {};
  const isEdit = Boolean(initial.id);

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <input type="hidden" name="id" value={initial.id ?? ""} />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Link
            href="/admin/careers"
            className="group inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All roles
          </Link>
          <h1 className="mt-1 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isEdit ? "Edit role" : "New role"}
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            {isEdit ? "Update details, or set Active off to hide it from the public page." : "Add an open position to /careers."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-[0_4px_16px_-4px_rgba(15,23,42,0.3)]"
          >
            {pending ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEdit ? "Save changes" : "Create role"}
              </>
            )}
          </button>
        </div>
      </div>

      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" strokeWidth={2.2} />
          <div className="text-red-900 text-sm leading-relaxed">{state.error}</div>
        </div>
      )}

      {/* Card: Core */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <header className="px-5 sm:px-6 py-4 border-b border-slate-100">
          <h2 className="text-slate-900 text-sm font-bold tracking-tight">Role details</h2>
          <p className="text-slate-500 text-xs mt-0.5">Title, department, location.</p>
        </header>
        <div className="px-5 sm:px-6 py-5 space-y-4">
          <Field label="Title" error={errors.title}>
            <input
              name="title"
              defaultValue={initial.title}
              placeholder="Senior Full-Stack Engineer"
              className={inputCls(errors.title)}
            />
          </Field>

          <Field label="Department" error={errors.dept}>
            <SegmentedSelect
              name="dept"
              defaultValue={initial.dept}
              options={VALID_DEPTS.slice()}
            />
          </Field>

          <Field label="Location" error={errors.location}>
            <input
              name="location"
              defaultValue={initial.location}
              placeholder="Remote · Worldwide"
              className={inputCls(errors.location)}
            />
          </Field>

          <Field label="Employment type" error={errors.type}>
            <SegmentedSelect
              name="type"
              defaultValue={initial.type}
              options={VALID_TYPES.slice()}
            />
          </Field>
        </div>
      </section>

      {/* Card: Posting */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <header className="px-5 sm:px-6 py-4 border-b border-slate-100">
          <h2 className="text-slate-900 text-sm font-bold tracking-tight">Posting</h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Visibility and freshness signals.
          </p>
        </header>
        <div className="px-5 sm:px-6 py-5 space-y-4">
          <Field label="Posted date" hint="Used to compute the 'X days ago' label." error={errors.posted}>
            <input
              type="date"
              name="posted"
              defaultValue={initial.posted}
              className={inputCls(errors.posted)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-300">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={initial.featured}
                className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <div className="text-sm font-semibold text-slate-900">Featured</div>
                <div className="text-xs text-slate-500">Pin to the top of /careers.</div>
              </div>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-300">
              <input
                type="checkbox"
                name="active"
                defaultChecked={initial.active}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <div className="text-sm font-semibold text-slate-900">Active</div>
                <div className="text-xs text-slate-500">Visible on the public page.</div>
              </div>
            </label>
          </div>
        </div>
      </section>
    </form>
  );
}

/* ───────────────────────── UI atoms ───────────────────────── */

function inputCls(error?: string): string {
  return [
    "w-full px-3 py-2.5 rounded-lg border bg-white text-slate-900 text-sm",
    "placeholder:text-slate-400 transition-all",
    "focus:outline-none focus:ring-4",
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-slate-400 focus:ring-slate-100",
  ].join(" ");
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-1.5">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-slate-400 text-xs">{hint}</p>}
      {error && <p className="mt-1 text-red-600 text-xs font-medium">{error}</p>}
    </div>
  );
}

function SegmentedSelect({
  name,
  defaultValue,
  options,
}: {
  name: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label key={opt} className="relative cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            defaultChecked={defaultValue === opt}
            className="peer absolute opacity-0 inset-0"
          />
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-semibold peer-checked:bg-slate-900 peer-checked:border-slate-900 peer-checked:text-white transition-all">
            {opt}
          </span>
        </label>
      ))}
    </div>
  );
}
