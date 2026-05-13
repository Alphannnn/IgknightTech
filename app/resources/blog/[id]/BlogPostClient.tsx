"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type SVGProps } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import type { BlogPostView as Article } from "@/lib/blog";
import { BlogCover } from "../../BlogCover";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  Clock,
  Calendar,
  Check,
  Link as LinkIcon,
} from "lucide-react";

/* ───────────────────────── Inline brand icons ───────────────────────── */

const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ───────────────────────── Helpers ───────────────────────── */

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ───────────────────────── Reading progress ───────────────────────── */

function ReadingProgress({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${color}, ${color}AA, ${color})`,
          boxShadow: `0 0 12px ${color}AA`,
        }}
      />
    </div>
  );
}

/* ───────────────────────── Back to top ───────────────────────── */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-[0_10px_30px_-6px_rgba(15,23,42,0.4)] flex items-center justify-center transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4" strokeWidth={2.2} />
    </button>
  );
}

/* ───────────────────────── Share row ───────────────────────── */

function ShareRow({ title, color }: { title: string; color: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Reading window.location is intentional — it's an external system
    // unavailable during SSR, so the setState must happen post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(window.location.href);
  }, []);

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may not be available — silently degrade
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
        Share
      </span>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter / X"
        className="group w-9 h-9 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center"
      >
        <TwitterIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-900 transition-colors" />
      </a>
      <a
        href={liUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="group w-9 h-9 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center"
      >
        <LinkedinIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-900 transition-colors" />
      </a>
      <button
        onClick={copy}
        aria-label="Copy link"
        className="group inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
      >
        {copied ? (
          <>
            <Check
              className="w-3.5 h-3.5"
              style={{ color }}
              strokeWidth={2.4}
            />
            <span className="text-xs font-semibold text-slate-900">Copied</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-900 transition-colors" />
            <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
              Copy link
            </span>
          </>
        )}
      </button>
    </div>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function BlogPostClient({
  article,
  idx,
  totalCount,
  prev,
  next,
  related,
}: {
  article: Article;
  idx: number;
  totalCount: number;
  prev: Article;
  next: Article;
  related: Article[];
}) {
  // Track active section for TOC highlight
  const [activeSection, setActiveSection] = useState<string>("");

  const sectionAnchors = useMemo(() => {
    return article.body
      .filter((s) => s.heading)
      .map((s) => ({ id: slugify(s.heading!), label: s.heading! }));
  }, [article]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.5, 1] }
    );
    sectionAnchors.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionAnchors]);

  const c = article.categoryColor;

  return (
    <>
      <Navbar />
      <ReadingProgress color={c} />
      <BackToTop />

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200/70">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 h-14 flex items-center justify-between">
          <Link
            href="/resources"
            className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All writing
          </Link>
          <span className="font-mono text-slate-400 text-xs tabular-nums">
            {String(idx + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
          </span>
        </div>
      </div>

      <article className="bg-[#FAFAF8]">

        {/* ─────── Article header ─────── */}
        <header className="relative w-full overflow-hidden bg-white pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 border-b border-slate-200/70">
          <div
            aria-hidden="true"
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[860px] h-[460px] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }}
          />

          <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: `${c}1A`,
                  color: c,
                  border: `1px solid ${c}40`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: c }}
                />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3 h-3" /> {article.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3 h-3" /> {article.readTime}
              </span>
            </div>

            <h1 className="mt-6 text-slate-900 font-extrabold tracking-tight leading-[1.02] text-[2.5rem] sm:text-5xl md:text-[3.75rem]">
              {article.title}
            </h1>

            <p className="mt-6 text-slate-600 text-lg sm:text-xl leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author + share row */}
            <div className="mt-8 flex items-center justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold ring-4 ring-white shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
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
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {article.author}
                  </div>
                  <div className="text-xs text-slate-500">
                    {article.authorRole}
                  </div>
                </div>
              </div>

              <ShareRow title={article.title} color={c} />
            </div>
          </div>
        </header>

        {/* ─────── Cover ─────── */}
        <div className="bg-white">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-10 sm:py-12">
            <BlogCover
              article={article}
              aspect="aspect-[16/9]"
              size="large"
              showHoverArrow={false}
            />
          </div>
        </div>

        {/* ─────── Body + TOC ─────── */}
        <div className="relative">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-12 xl:gap-16">

              {/* Body */}
              <div className="max-w-[720px] xl:max-w-none mx-auto xl:mx-0 w-full">
                {article.body.map((section, sIdx) => {
                  const isFirstSection = sIdx === 0;
                  const sectionId = section.heading ? slugify(section.heading) : `intro`;

                  return (
                    <section
                      key={sIdx}
                      id={sectionId}
                      className={`scroll-mt-24 ${sIdx === 0 ? "" : "mt-12 sm:mt-14"}`}
                    >
                      {section.heading && (
                        <h2 className="group relative text-slate-900 text-2xl sm:text-[1.85rem] font-extrabold tracking-tight leading-snug mb-5">
                          <span
                            aria-hidden="true"
                            className="absolute -left-5 top-1/2 -translate-y-1/2 h-0 group-hover:h-[70%] w-[3px] rounded-full transition-all duration-500 hidden sm:block"
                            style={{ background: c }}
                          />
                          {section.heading}
                          <a
                            href={`#${sectionId}`}
                            aria-label="Link to this section"
                            className="ml-2 inline-flex items-center align-middle text-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <LinkIcon className="w-4 h-4" />
                          </a>
                        </h2>
                      )}
                      {section.paragraphs.map((p, pi) => {
                        const isDropCap = isFirstSection && pi === 0;
                        return (
                          <p
                            key={pi}
                            className={`text-slate-700 text-base sm:text-[18px] leading-[1.78] mb-6 last:mb-0 ${
                              isDropCap
                                ? "first-letter:float-left first-letter:font-black first-letter:text-[4.25rem] first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:tracking-tight"
                                : ""
                            }`}
                            style={
                              isDropCap
                                ? ({
                                    ["--cap-color" as string]: c,
                                  } as React.CSSProperties)
                                : undefined
                            }
                          >
                            {isDropCap ? (
                              <FirstParagraph text={p} color={c} />
                            ) : (
                              p
                            )}
                          </p>
                        );
                      })}
                    </section>
                  );
                })}

                {/* Inline divider */}
                <hr className="mt-14 border-slate-200/80" />

                {/* Article footer: author bio */}
                <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex items-start gap-5">
                  <span
                    aria-hidden="true"
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold ring-4 ring-white shadow-[0_4px_12px_rgba(15,23,42,0.08)] shrink-0"
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
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Written by
                    </div>
                    <div className="mt-1 text-slate-900 text-lg font-extrabold tracking-tight">
                      {article.author}
                    </div>
                    <div className="text-sm text-slate-500">
                      {article.authorRole} · Igknight Tech
                    </div>
                  </div>
                </div>

                {/* Bottom share row */}
                <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-sm text-slate-500">
                    Found this useful?
                  </span>
                  <ShareRow title={article.title} color={c} />
                </div>

                {/* Inline CTA */}
                <div className="mt-12 rounded-2xl overflow-hidden relative p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200">
                  <div
                    aria-hidden="true"
                    className="absolute -top-20 -right-10 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }}
                  />
                  <div className="relative">
                    <h3 className="text-slate-900 text-lg sm:text-xl font-extrabold tracking-tight">
                      Want this kind of work on your project?
                    </h3>
                    <p className="mt-1.5 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                      One conversation, honest pricing, recommended engagement
                      model — within a business day.
                    </p>
                  </div>
                  <Link
                    href="/schedule"
                    className="relative group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    Start a project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* TOC sidebar */}
              {sectionAnchors.length > 0 && (
                <aside className="hidden xl:block">
                  <div className="sticky top-24">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-4">
                      On this page
                    </div>
                    <nav className="relative pl-4">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1 bottom-1 w-px bg-slate-200"
                      />
                      <ol className="space-y-3">
                        {sectionAnchors.map((s, i) => {
                          const isActive = activeSection === s.id;
                          return (
                            <li key={s.id} className="relative">
                              <span
                                aria-hidden="true"
                                className={`absolute -left-4 top-1.5 w-px h-4 transition-all duration-300 ${
                                  isActive ? "" : "opacity-0"
                                }`}
                                style={{ background: c, boxShadow: `0 0 6px ${c}` }}
                              />
                              <a
                                href={`#${s.id}`}
                                className={`block text-sm leading-snug transition-colors ${
                                  isActive
                                    ? "font-bold text-slate-900"
                                    : "text-slate-500 hover:text-slate-900"
                                }`}
                              >
                                <span className="font-mono text-[10px] tabular-nums text-slate-400 mr-2">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                {s.label}
                              </a>
                            </li>
                          );
                        })}
                      </ol>
                    </nav>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </div>

        {/* ─────── Prev / next ─────── */}
        <div className="bg-white border-t border-slate-200/70">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={`/resources/blog/${prev.id}`}
                className="group rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)] transition-all duration-300 p-5 sm:p-6 flex items-start gap-4"
              >
                <span
                  className="w-10 h-10 rounded-full border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Previous
                  </div>
                  <div
                    className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: prev.categoryColor }}
                  >
                    {prev.category}
                  </div>
                  <div className="mt-1 text-slate-900 text-base font-extrabold tracking-tight leading-snug">
                    {prev.title}
                  </div>
                </div>
              </Link>
              <Link
                href={`/resources/blog/${next.id}`}
                className="group rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)] transition-all duration-300 p-5 sm:p-6 flex items-start gap-4 sm:flex-row-reverse sm:text-right"
              >
                <span
                  className="w-10 h-10 rounded-full border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Next
                  </div>
                  <div
                    className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: next.categoryColor }}
                  >
                    {next.category}
                  </div>
                  <div className="mt-1 text-slate-900 text-base font-extrabold tracking-tight leading-snug">
                    {next.title}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ─────── Related ─────── */}
        <section className="bg-[#FAFAF8] border-t border-slate-200/70 py-16 sm:py-20">
          <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Keep reading
              </h2>
              <Link
                href="/resources"
                className="group inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
              >
                All articles
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/resources/blog/${r.id}`}
                  className="group flex flex-col"
                >
                  <BlogCover article={r} aspect="aspect-[4/3]" size="small" />

                  <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em]">
                    <span style={{ color: r.categoryColor }}>{r.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-slate-500 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {r.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-slate-900 text-lg font-extrabold tracking-tight leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}

/* Wrapper that colors the drop-cap first letter without leaking the style to the rest of the paragraph */
function FirstParagraph({ text, color }: { text: string; color: string }) {
  // Split first letter to color it explicitly
  const first = text[0] ?? "";
  const rest = text.slice(1);
  return (
    <>
      <span
        className="float-left font-black text-[4.25rem] sm:text-[5rem] leading-[0.85] mr-3 mt-1.5 tracking-tight"
        style={{ color }}
      >
        {first}
      </span>
      {rest}
    </>
  );
}
