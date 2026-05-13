"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { savePostAction, type SavePostState } from "./actions";

export type BodySection = { heading?: string; paragraphs: string[] };

export type BlogFormInitial = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  author: string;
  authorRole: string;
  avatarFrom: string;
  avatarTo: string;
  /** yyyy-mm-dd */
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  status: "draft" | "published";
  body: BodySection[];
};

const CATEGORY_PRESETS: { name: string; color: string }[] = [
  { name: "Engineering",    color: "#7BB6FF" },
  { name: "Infrastructure", color: "#67E8F9" },
  { name: "Frontend",       color: "#A78BFA" },
  { name: "Compliance",     color: "#34D399" },
  { name: "AI",             color: "#F472B6" },
  { name: "Design",         color: "#FCD34D" },
];

const AVATAR_PRESETS: { from: string; to: string; label: string }[] = [
  { from: "#7BB6FF", to: "#3B82F6", label: "Blue" },
  { from: "#67E8F9", to: "#0891B2", label: "Cyan" },
  { from: "#A78BFA", to: "#7C3AED", label: "Purple" },
  { from: "#34D399", to: "#059669", label: "Emerald" },
  { from: "#FCD34D", to: "#D97706", label: "Amber" },
  { from: "#F472B6", to: "#BE185D", label: "Pink" },
];

/** A textarea where blank lines split paragraphs. */
function paragraphsToText(paragraphs: string[]): string {
  return paragraphs.join("\n\n");
}
function textToParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

const initialActionState: SavePostState = {};

export default function BlogForm({ initial }: { initial: BlogFormInitial }) {
  const [state, action, pending] = useActionState(savePostAction, initialActionState);
  const [sections, setSections] = useState<BodySection[]>(
    initial.body.length > 0 ? initial.body : [{ paragraphs: [""] }]
  );
  const [slug, setSlug] = useState(initial.slug);
  const [autoSlug, setAutoSlug] = useState(!initial.id); // only auto when creating
  const [title, setTitle] = useState(initial.title);
  const [category, setCategory] = useState(initial.category);
  const [categoryColor, setCategoryColor] = useState(initial.categoryColor);
  const [avatarFrom, setAvatarFrom] = useState(initial.avatarFrom);
  const [avatarTo, setAvatarTo] = useState(initial.avatarTo);
  const [image, setImage] = useState(initial.image);

  const bodyJson = useMemo(
    () =>
      JSON.stringify(
        sections.map((s) => ({
          heading: s.heading ?? undefined,
          paragraphs: s.paragraphs,
        }))
      ),
    [sections]
  );

  function updateSection(i: number, patch: Partial<BodySection>) {
    setSections((arr) => arr.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }
  function addSection() {
    setSections((arr) => [...arr, { paragraphs: [""] }]);
  }
  function removeSection(i: number) {
    setSections((arr) => arr.filter((_, idx) => idx !== i));
  }
  function moveSection(i: number, dir: -1 | 1) {
    setSections((arr) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      const copy = [...arr];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  const errors = state.fieldErrors ?? {};
  const isEdit = Boolean(initial.id);

  return (
    <form action={action} className="space-y-6">
      {/* Hidden state */}
      <input type="hidden" name="id" value={initial.id ?? ""} />
      <input type="hidden" name="bodyJson" value={bodyJson} />

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Link
            href="/admin/blog"
            className="group inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            All posts
          </Link>
          <h1 className="mt-1 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isEdit ? "Edit post" : "New post"}
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            {isEdit ? "Update content, status, or metadata." : "Write a draft now and publish when ready."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/blog"
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
                {isEdit ? "Save changes" : "Create post"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top-level error */}
      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" strokeWidth={2.2} />
          <div className="text-red-900 text-sm leading-relaxed">{state.error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

        {/* Main content column */}
        <div className="space-y-6">

          {/* Card: Core */}
          <SectionCard title="Article" subtitle="Title, slug, excerpt.">
            <Field label="Title" error={errors.title}>
              <input
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (autoSlug) setSlug(slugifyInline(e.target.value));
                }}
                placeholder="How we ship ML in production"
                className={inputCls(errors.title)}
              />
            </Field>

            <Field
              label="Slug"
              hint="URL identifier — lowercase letters, digits, dashes."
              error={errors.slug}
            >
              <div className="flex items-stretch gap-2">
                <span className="inline-flex items-center px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500 font-mono">
                  /resources/blog/
                </span>
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  onFocus={() => setAutoSlug(false)}
                  placeholder="my-post-slug"
                  className={inputCls(errors.slug) + " flex-1 font-mono"}
                />
              </div>
            </Field>

            <Field label="Excerpt" hint="Shows on the index card and as the meta description." error={errors.excerpt}>
              <textarea
                name="excerpt"
                defaultValue={initial.excerpt}
                rows={3}
                placeholder="A 1-2 sentence summary."
                className={inputCls(errors.excerpt) + " resize-y"}
              />
            </Field>
          </SectionCard>

          {/* Card: Body */}
          <SectionCard
            title="Body"
            subtitle="Add one or more sections. Headings are optional. Paragraphs are separated by a blank line."
          >
            <div className="space-y-4">
              {sections.map((s, i) => (
                <BodySectionEditor
                  key={i}
                  index={i}
                  total={sections.length}
                  section={s}
                  onChange={(patch) => updateSection(i, patch)}
                  onRemove={() => removeSection(i)}
                  onMove={(dir) => moveSection(i, dir)}
                />
              ))}
              <button
                type="button"
                onClick={addSection}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-dashed border-slate-300 hover:border-slate-400 px-4 py-3 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Add section
              </button>
              {errors.body && (
                <div className="text-red-600 text-xs font-medium">{errors.body}</div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">

          {/* Card: Publish */}
          <SectionCard title="Publish" subtitle="Visibility and status.">
            <Field label="Status">
              <div className="grid grid-cols-2 gap-2">
                <StatusOption value="published" defaultChecked={initial.status === "published"} />
                <StatusOption value="draft"     defaultChecked={initial.status === "draft"} />
              </div>
            </Field>
            <Field label="Featured" hint="Show with a 'Featured' chip on the index.">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={initial.featured}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-sm text-slate-700">Feature this post</span>
              </label>
            </Field>
            <Field label="Publication date" error={errors.date}>
              <input
                type="date"
                name="date"
                defaultValue={initial.date}
                className={inputCls(errors.date)}
              />
            </Field>
            <Field label="Read time" hint='Free-text — e.g. "12 min read".' error={errors.readTime}>
              <input
                name="readTime"
                defaultValue={initial.readTime}
                placeholder="10 min read"
                className={inputCls(errors.readTime)}
              />
            </Field>
          </SectionCard>

          {/* Card: Taxonomy */}
          <SectionCard title="Category" subtitle="Affects the badge color across the site.">
            <Field label="Category name" error={errors.category}>
              <input
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Engineering"
                className={inputCls(errors.category)}
              />
            </Field>
            <Field label="Category color" error={errors.categoryColor}>
              <ColorPicker
                value={categoryColor}
                onChange={setCategoryColor}
                presets={CATEGORY_PRESETS.map((p) => ({ value: p.color, label: p.name }))}
              />
              <input type="hidden" name="categoryColor" value={categoryColor} />
            </Field>
          </SectionCard>

          {/* Card: Author */}
          <SectionCard title="Author" subtitle="Byline and avatar gradient.">
            <Field label="Name" error={errors.author}>
              <input
                name="author"
                defaultValue={initial.author}
                placeholder="Sarah Chen"
                className={inputCls(errors.author)}
              />
            </Field>
            <Field label="Role" error={errors.authorRole}>
              <input
                name="authorRole"
                defaultValue={initial.authorRole}
                placeholder="Co-founder · CEO"
                className={inputCls(errors.authorRole)}
              />
            </Field>
            <Field label="Avatar gradient">
              <AvatarPicker
                from={avatarFrom}
                to={avatarTo}
                onChange={(from, to) => {
                  setAvatarFrom(from);
                  setAvatarTo(to);
                }}
                presets={AVATAR_PRESETS}
              />
              <input type="hidden" name="avatarFrom" value={avatarFrom} />
              <input type="hidden" name="avatarTo" value={avatarTo} />
              {(errors.avatarFrom || errors.avatarTo) && (
                <div className="text-red-600 text-xs font-medium mt-1">
                  {errors.avatarFrom || errors.avatarTo}
                </div>
              )}
            </Field>
          </SectionCard>

          {/* Card: Featured image */}
          <SectionCard title="Featured image" subtitle="Optional path — defaults to the generative cover when empty.">
            <Field label="Path" hint="e.g. /blog/my-post.jpg">
              <input
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/blog/my-post.jpg"
                className={inputCls()}
              />
            </Field>
          </SectionCard>

        </div>
      </div>
    </form>
  );
}

/* ───────────────────────── UI atoms ───────────────────────── */

function slugifyInline(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

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

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <header className="px-5 sm:px-6 py-4 border-b border-slate-100">
        <h2 className="text-slate-900 text-sm font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
        )}
      </header>
      <div className="px-5 sm:px-6 py-5 space-y-4">{children}</div>
    </section>
  );
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
      {hint && !error && (
        <p className="mt-1 text-slate-400 text-xs">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-red-600 text-xs font-medium">{error}</p>
      )}
    </div>
  );
}

function StatusOption({
  value,
  defaultChecked,
}: {
  value: "published" | "draft";
  defaultChecked: boolean;
}) {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        name="status"
        value={value}
        defaultChecked={defaultChecked}
        className="peer absolute opacity-0 inset-0"
      />
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white peer-checked:bg-slate-900 peer-checked:border-slate-900 peer-checked:text-white text-slate-700 text-sm font-semibold transition-all">
        {value === "published" ? (
          <Eye className="w-3.5 h-3.5" />
        ) : (
          <EyeOff className="w-3.5 h-3.5" />
        )}
        {value === "published" ? "Published" : "Draft"}
      </div>
    </label>
  );
}

function ColorPicker({
  value,
  onChange,
  presets,
}: {
  value: string;
  onChange: (v: string) => void;
  presets: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span
          className="w-9 h-9 rounded-lg border border-slate-200 shrink-0"
          style={{ background: value }}
          aria-label={`Current color ${value}`}
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#7BB6FF"
          className={inputCls() + " font-mono"}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => onChange(p.value)}
            title={p.label}
            className={`w-6 h-6 rounded-md border transition-all ${
              value.toLowerCase() === p.value.toLowerCase()
                ? "border-slate-900 ring-2 ring-slate-200"
                : "border-slate-200 hover:border-slate-300"
            }`}
            style={{ background: p.value }}
            aria-label={p.label}
          />
        ))}
      </div>
    </div>
  );
}

function AvatarPicker({
  from,
  to,
  onChange,
  presets,
}: {
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
  presets: { from: string; to: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="w-10 h-10 rounded-full shrink-0 ring-2 ring-white shadow-[0_2px_8px_rgba(15,23,42,0.12)]"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        />
        <div className="grid grid-cols-2 gap-2 flex-1">
          <input
            value={from}
            onChange={(e) => onChange(e.target.value, to)}
            placeholder="#7BB6FF"
            className={inputCls() + " font-mono text-xs"}
          />
          <input
            value={to}
            onChange={(e) => onChange(from, e.target.value)}
            placeholder="#3B82F6"
            className={inputCls() + " font-mono text-xs"}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => onChange(p.from, p.to)}
            title={p.label}
            className={`w-7 h-7 rounded-full transition-all ring-2 ${
              from.toLowerCase() === p.from.toLowerCase()
                ? "ring-slate-900"
                : "ring-transparent hover:ring-slate-300"
            }`}
            style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
            aria-label={p.label}
          />
        ))}
      </div>
    </div>
  );
}

function BodySectionEditor({
  index,
  total,
  section,
  onChange,
  onRemove,
  onMove,
}: {
  index: number;
  total: number;
  section: BodySection;
  onChange: (patch: Partial<BodySection>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/40 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-200/70 bg-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 font-mono tabular-nums">
            Section {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            aria-label="Move section up"
            className="w-7 h-7 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            aria-label="Move section down"
            className="w-7 h-7 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove section"
            className="w-7 h-7 rounded-md hover:bg-red-50 hover:text-red-600 text-slate-500 flex items-center justify-center transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <input
          value={section.heading ?? ""}
          onChange={(e) => onChange({ heading: e.target.value || undefined })}
          placeholder="Heading (optional)"
          className={inputCls() + " font-bold"}
        />
        <textarea
          value={paragraphsToText(section.paragraphs)}
          onChange={(e) => onChange({ paragraphs: textToParagraphs(e.target.value) })}
          rows={6}
          placeholder="Paragraph 1.&#10;&#10;Paragraph 2."
          className={inputCls() + " resize-y leading-relaxed"}
        />
      </div>
    </div>
  );
}
