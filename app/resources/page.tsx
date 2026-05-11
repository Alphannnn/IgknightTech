"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ARTICLES, REPOS, TALKS, type Article, type Repo, type Talk } from "./resources-data";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  GitFork,
  Mic,
  Mail,
  Check,
} from "lucide-react";

/* ───────────────────────── Page ───────────────────────── */

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <BlogSection />
      <OpenSourceSection />
      <SpeakingSection />
      <NewsletterCTA />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero (light) ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-14">

      {/* Single soft orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">
        <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
          Resources
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
        </div>

        <h1 className="mt-5 text-slate-900 font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] max-w-4xl mx-auto">
          Sharper engineering,{" "}
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
            />
            <span className="relative">in public</span>
          </span>
          .
        </h1>

        <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Long-form writing, open-source work, and talks from the team. The
          stuff we&apos;d want to read.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Blog (light, magazine layout) ───────────────────────── */

function BlogSection() {
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const rest = ARTICLES.filter((a) => a.id !== featured.id).slice(0, 5);

  return (
    <section id="blog" className="relative w-full bg-white py-16 sm:py-20 md:py-24">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-px w-6 bg-slate-300" />
              Engineering Blog
            </div>
            <h2 className="mt-3 text-slate-900 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Latest writing
            </h2>
          </div>
          <Link
            href="#"
            className="group inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors flex-shrink-0"
          >
            All posts
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 lg:gap-6">

          {/* Featured article */}
          <FeaturedArticle article={featured} />

          {/* Compact list of articles */}
          <div className="flex flex-col gap-0 divide-y divide-slate-100">
            {rest.map((a) => (
              <CompactArticle key={a.id} article={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link
      href="#"
      className="group relative rounded-3xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.08)] transition-all duration-500 overflow-hidden flex flex-col"
    >
      {/* Visual top with category-colored gradient */}
      <div
        className="relative h-44 sm:h-56 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${article.categoryColor}30, ${article.categoryColor}08)`,
        }}
      >
        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)",
          }}
        />
        {/* Big article number stamp */}
        <div
          className="absolute -bottom-6 -right-2 text-[12rem] font-black leading-none opacity-15 select-none tracking-tighter"
          style={{ color: article.categoryColor }}
        >
          01
        </div>

        {/* Featured badge */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-white/95 text-slate-900 backdrop-blur shadow-sm">
            Featured
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full backdrop-blur"
            style={{
              background: `${article.categoryColor}30`,
              color: article.categoryColor,
            }}
          >
            {article.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-6 sm:p-7">
        <h3 className="text-slate-900 text-xl sm:text-2xl md:text-[1.75rem] font-extrabold tracking-tight leading-[1.15] group-hover:text-slate-700 transition-colors">
          {article.title}
        </h3>
        <p className="mt-3 text-slate-500 text-sm sm:text-[15px] leading-relaxed">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow-sm"
              style={{ background: `linear-gradient(135deg, ${article.authorAvatar.from}, ${article.authorAvatar.to})` }}
            >
              {article.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="text-xs">
              <div className="text-slate-900 font-bold">{article.author}</div>
              <div className="text-slate-500">{article.date} · {article.readTime}</div>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

function CompactArticle({ article }: { article: Article }) {
  return (
    <Link
      href="#"
      className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0 hover:pl-2 transition-all duration-300"
    >
      <span
        className="mt-1.5 flex-shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded"
        style={{
          background: `${article.categoryColor}1A`,
          color: article.categoryColor,
        }}
      >
        {article.category}
      </span>

      <div className="flex-1 min-w-0">
        <h3 className="text-slate-900 text-[15px] sm:text-base font-bold tracking-tight leading-snug group-hover:text-slate-700 transition-colors">
          {article.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-slate-500 text-xs">
          <span>{article.author}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
          <span>{article.date}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
          <span>{article.readTime}</span>
        </div>
      </div>

      <ArrowUpRight className="w-4 h-4 mt-1 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
    </Link>
  );
}

/* ───────────────────────── Open Source (dark, GitHub-style) ───────────────────────── */

function OpenSourceSection() {
  return (
    <section
      id="open-source"
      className="relative w-full overflow-hidden py-20 sm:py-24 md:py-28"
      style={{ background: "linear-gradient(180deg, #0C1C3D 0%, #0A1635 100%)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/80 font-mono">
              <span className="h-px w-6 bg-blue-300/50" />
              ~/open-source
            </div>
            <h2 className="mt-3 text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Code we maintain in public
            </h2>
            <p className="mt-2 text-blue-100/55 text-sm sm:text-base max-w-xl leading-relaxed">
              Libraries, tools, and starter kits we use ourselves —
              MIT-licensed, well-maintained, and open to contributions.
            </p>
          </div>
          <Link
            href="#"
            className="group inline-flex items-center gap-1.5 text-blue-100/70 hover:text-white text-sm font-semibold transition-colors flex-shrink-0 font-mono"
          >
            github.com/igknight
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {REPOS.map((r) => (
            <RepoCard key={r.name} repo={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href="#"
      className="group block rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Folder/repo dot */}
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{
              background: repo.languageColor,
              boxShadow: `0 0 8px ${repo.languageColor}80`,
            }}
          />
          <span className="text-white font-mono font-semibold text-sm sm:text-[15px] truncate">
            {repo.name}
          </span>
        </div>

        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
      </div>

      <p className="mt-3 text-blue-100/65 text-sm leading-relaxed">
        {repo.description}
      </p>

      {/* Footer: language + stats */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-5 text-blue-200/55 text-xs font-mono">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: repo.languageColor }}
          />
          <span>{repo.language}</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks}
        </span>
      </div>
    </a>
  );
}

/* ───────────────────────── Speaking & Talks (light, event list) ───────────────────────── */

function SpeakingSection() {
  return (
    <section id="speaking" className="relative w-full bg-white py-16 sm:py-20 md:py-24">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-px w-6 bg-slate-300" />
              Speaking & Talks
            </div>
            <h2 className="mt-3 text-slate-900 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Where you can hear us
            </h2>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <Mic className="w-3 h-3" />
            {TALKS.length} upcoming
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          {TALKS.map((talk, i) => (
            <TalkRow key={i} talk={talk} isLast={i === TALKS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TalkRow({ talk, isLast }: { talk: Talk; isLast: boolean }) {
  const typeColors: Record<Talk["type"], string> = {
    Keynote: "#F472B6",
    Talk: "#7BB6FF",
    Workshop: "#34D399",
    Panel: "#FCD34D",
  };
  const color = typeColors[talk.type];

  return (
    <a
      href="#"
      className={`group flex items-center gap-4 sm:gap-6 p-5 sm:p-6 transition-all duration-300 ${
        isLast ? "" : "border-b border-slate-100"
      } hover:bg-slate-50/60`}
    >
      {/* Date column — ticket-stub style */}
      <div className="flex-shrink-0 w-14 sm:w-16 text-center">
        <div
          className="text-2xl sm:text-3xl font-black tracking-tight transition-colors"
          style={{ color }}
        >
          {talk.date}
        </div>
        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {talk.month}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">{talk.year}</div>
      </div>

      {/* Vertical divider */}
      <div className="hidden sm:block w-px h-12 bg-slate-200 flex-shrink-0" />

      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full"
            style={{
              background: `${color}1F`,
              color,
            }}
          >
            {talk.type}
          </span>
          <span className="text-slate-500 text-xs font-semibold">
            {talk.conference} · {talk.location}
          </span>
        </div>
        <h3 className="mt-1.5 text-slate-900 text-base sm:text-lg font-bold tracking-tight leading-snug group-hover:text-slate-700 transition-colors">
          {talk.title}
        </h3>
        <div className="mt-1 text-slate-500 text-xs">
          by <span className="font-semibold text-slate-700">{talk.speaker}</span>
        </div>
      </div>

      {/* Arrow */}
      <ArrowUpRight className="hidden sm:block w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
    </a>
  );
}

/* ───────────────────────── Newsletter CTA (dark) ───────────────────────── */

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setDone(true);
      setEmail("");
      setTimeout(() => setDone(false), 3500);
    }
  };

  return (
    <section id="newsletter" className="relative w-full bg-white py-16 sm:py-20 md:py-24">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-14"
          style={{ background: "linear-gradient(135deg, #0F1F45 0%, #0C1C3D 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,182,255,0.20) 0%, transparent 70%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-white font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl">
                One email,{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(90deg, #7BB6FF, #BFD9FF, #7BB6FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  monthly
                </span>
                .
              </h2>
              <p className="mt-4 text-blue-100/65 text-base sm:text-lg leading-relaxed max-w-lg">
                Engineering deep-dives, what we&apos;re shipping, what we&apos;re reading.
                No marketing fluff, no upsells.
              </p>
            </div>

            <form onSubmit={onSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-blue-200/40 focus:border-[#7BB6FF]/60 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-[#7BB6FF]/10 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)] whitespace-nowrap"
                >
                  {done ? (
                    <>
                      <Check className="w-4 h-4" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-blue-200/45 text-xs">
                Unsubscribe with one click. We don&apos;t share your email — ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
