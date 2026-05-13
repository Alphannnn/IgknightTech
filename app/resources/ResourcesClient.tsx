"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { BlogPostView } from "@/lib/blog";
import { BlogCover } from "./BlogCover";
import { ArrowUpRight, Clock } from "lucide-react";

type Article = BlogPostView;

/* ───────────────────────── Page ───────────────────────── */

export default function ResourcesClient({ posts }: { posts: Article[] }) {
  return (
    <>
      <Navbar />
      <Hero />
      <BlogSection posts={posts} />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16">

      {/* Single soft orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[640px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
        />
      </div>

      {/* Faint grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 60%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 60%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">
        <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
          The blog
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
        </div>

        <h1 className="mt-5 text-slate-900 font-extrabold tracking-tight leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] max-w-4xl mx-auto">
          Sharper engineering,{" "}
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-1 sm:bottom-2 md:bottom-3 h-2.5 sm:h-3 md:h-[16px] bg-amber-300/85 rounded-[3px]"
            />
            <span className="relative">in public</span>
          </span>
          .
        </h1>

        <p className="mt-6 text-slate-600 text-base sm:text-lg md:text-[1.2rem] max-w-2xl mx-auto leading-relaxed">
          Long-form writing from the team — postmortems, architecture notes, and
          the lessons we learned the hard way.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Blog (white, filter + featured + grid) ───────────────────────── */

function BlogSection({ posts }: { posts: Article[] }) {
  // Posts are already sorted by date desc from the server.
  const sorted = posts;

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: { name: string; color: string }[] = [];
    for (const a of sorted) {
      if (!seen.has(a.category)) {
        seen.add(a.category);
        ordered.push({ name: a.category, color: a.categoryColor });
      }
    }
    return ordered;
  }, [sorted]);

  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () => (filter === "All" ? sorted : sorted.filter((a) => a.category === filter)),
    [filter, sorted]
  );

  // Featured = the most recent in the current filter
  const featured = filtered[0] ?? null;
  const rest = featured ? filtered.slice(1) : [];

  return (
    <section id="blog" className="relative w-full bg-white pb-20 sm:pb-24 md:pb-28">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        {/* Filter row */}
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12 flex-wrap">
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              {filter === "All" ? "All articles" : filter}
            </div>
            <h2 className="mt-2 text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
              {filter === "All" ? "Latest writing" : `${filter} writing`}
            </h2>
          </div>
          <div className="font-mono text-slate-500 text-sm tabular-nums">
            {String(filtered.length).padStart(2, "0")}{" "}
            <span className="text-slate-400">
              / {String(sorted.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 sm:mb-12">
          <CategoryChip
            label="All"
            count={sorted.length}
            isActive={filter === "All"}
            onClick={() => setFilter("All")}
          />
          {categories.map((c) => (
            <CategoryChip
              key={c.name}
              label={c.name}
              count={posts.filter((a) => a.category === c.name).length}
              color={c.color}
              isActive={filter === c.name}
              onClick={() => setFilter(c.name)}
            />
          ))}
        </div>

        {/* Featured (latest article — big cover) */}
        {featured && <FeaturedCard article={featured} />}

        {/* All other articles — listed below */}
        {rest.length > 0 && (
          <>
            <div className="mt-14 sm:mt-16 mb-6 sm:mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  The archive
                </div>
                <h3 className="mt-2 text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
                  All articles
                </h3>
              </div>
              <div className="font-mono text-slate-400 text-xs sm:text-sm tabular-nums">
                {String(rest.length).padStart(2, "0")} more
              </div>
            </div>
            <ol className="border-t border-slate-200">
              {rest.map((a) => (
                <ArticleListRow key={a.id} article={a} />
              ))}
            </ol>
          </>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-10 text-center">
            <p className="text-slate-700 font-semibold">
              Nothing yet in {filter}.
            </p>
            <p className="mt-1 text-slate-500 text-sm">
              We&apos;ll write here as the work comes up.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryChip({
  label,
  count,
  color,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  color?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
        isActive
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900"
      }`}
    >
      {color && (
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
        />
      )}
      {label}
      <span
        className={`font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-full ${
          isActive
            ? "bg-white/15 text-white/85"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/* ───────────────────────── Cards ───────────────────────── */

function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/resources/blog/${article.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 sm:gap-12 items-center"
    >
      {/* Generative cover */}
      <BlogCover article={article} aspect="aspect-[16/10]" size="large" />

      {/* Body */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
            style={{
              color: article.categoryColor,
              background: `${article.categoryColor}14`,
              border: `1px solid ${article.categoryColor}30`,
            }}
          >
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: article.categoryColor }}
            />
            {article.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600 bg-amber-100/60 border border-amber-200/80 px-2.5 py-1 rounded-full">
            Featured
          </span>
        </div>

        <h3 className="mt-6 text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_2px] bg-[position:0_100%] group-hover:bg-[length:100%_2px] transition-[background-size] duration-700 ease-out">
            {article.title}
          </span>
        </h3>

        <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-xl">
          {article.excerpt}
        </p>

        <div className="mt-7 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${article.authorAvatar.from}, ${article.authorAvatar.to})`,
            }}
          >
            {article.author
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900">
              {article.author}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              {article.date}
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <Clock className="w-3 h-3" /> {article.readTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleListRow({ article }: { article: Article }) {
  return (
    <li className="border-b border-slate-200 last:border-b-0">
      <Link
        href={`/resources/blog/${article.slug}`}
        className="group grid grid-cols-[88px_1fr] sm:grid-cols-[160px_1fr_44px] lg:grid-cols-[220px_1fr_44px] gap-4 sm:gap-6 lg:gap-8 items-center py-5 sm:py-7 lg:py-8 px-2 sm:px-3 rounded-2xl hover:bg-slate-50/70 transition-colors duration-300"
      >
        {/* Thumbnail cover */}
        <div className="shrink-0">
          <BlogCover
            article={article}
            aspect="aspect-[4/3] sm:aspect-[16/10]"
            size="small"
            rounded="rounded-xl"
            showHoverArrow={false}
          />
        </div>

        {/* Body */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] flex-wrap">
            <span style={{ color: article.categoryColor }}>
              {article.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-500 inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-500">{article.date}</span>
          </div>

          <h3 className="mt-2 text-slate-900 text-lg sm:text-xl lg:text-[1.4rem] font-extrabold tracking-tight leading-snug">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1.5px] bg-[position:0_100%] group-hover:bg-[length:100%_1.5px] transition-[background-size] duration-500 ease-out">
              {article.title}
            </span>
          </h3>

          <p className="mt-2 text-slate-600 text-sm sm:text-[15px] leading-relaxed line-clamp-2 max-w-2xl">
            {article.excerpt}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs">
            <span
              aria-hidden="true"
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
              style={{
                background: `linear-gradient(135deg, ${article.authorAvatar.from}, ${article.authorAvatar.to})`,
              }}
            >
              {article.author
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="text-slate-700 font-semibold">
              {article.author}
            </span>
            <span className="text-slate-400">· {article.authorRole}</span>
          </div>
        </div>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className="hidden sm:flex w-11 h-11 rounded-full border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 items-center justify-center transition-all duration-300 self-center"
        >
          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </span>
      </Link>
    </li>
  );
}

