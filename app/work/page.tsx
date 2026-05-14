"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CASES, INDUSTRIES, type CaseStudy } from "./cases";
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Trophy,
  Clock,
  Globe,
  MessagesSquare,
  CalendarCheck,
  ShieldCheck,
  FileLock,
  GitBranch,
  GraduationCap,
  Quote,
  Users,
  Sparkle,
  type LucideIcon,
} from "lucide-react";

type Stat = { value: string; label: string; sublabel: string; icon: LucideIcon };
const IMPACT_STATS: Stat[] = [
  {
    value: "50+",
    label: "Products shipped",
    sublabel: "From scrappy MVPs to multi-region platforms.",
    icon: Trophy,
  },
  {
    value: "$2.4B+",
    label: "Client revenue impact",
    sublabel: "Tracked across engagements since 2018.",
    icon: TrendingUp,
  },
  {
    value: "12",
    label: "Countries served",
    sublabel: "Teams across NA, EU, LATAM, and APAC.",
    icon: Globe,
  },
  {
    value: "96%",
    label: "Delivered on time",
    sublabel: "When we commit to a date, we mean it.",
    icon: Clock,
  },
];

type TrustItem = {
  icon: LucideIcon;
  title: string;
  body: string;
};
const TRUST_ITEMS: TrustItem[] = [
  {
    icon: CalendarCheck,
    title: "Weekly demos, not waterfall surprises",
    body: "Every Friday you see what actually shipped that week — working software, not slide decks. You always know where the project stands.",
  },
  {
    icon: MessagesSquare,
    title: "A direct line to the engineers",
    body: "A shared Slack channel from day one. No account managers in the middle — ask questions, get answers from the people writing the code.",
  },
  {
    icon: GitBranch,
    title: "You own everything we build",
    body: "Source code, IP, infrastructure, documentation — yours from the first commit. Hosted in your accounts, not ours.",
  },
  {
    icon: FileLock,
    title: "NDA-ready, audit-friendly",
    body: "Mutual NDAs signed before kickoff. SOC 2 controls in our delivery pipeline. References from past clients available on request.",
  },
  {
    icon: ShieldCheck,
    title: "Fixed scope. Fixed timeline.",
    body: "We scope, price, and commit to a date — and we tell you early if something needs to flex. No open-ended billing, no scope creep by stealth.",
  },
  {
    icon: GraduationCap,
    title: "Knowledge transfer built in",
    body: "The final two weeks are about handing the keys over — to your team or a new partner. No lock-in, no hostage architecture.",
  },
];

/* ───────────────────────── Page ───────────────────────── */

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCase />
      <HowWeEngage />
      <CaseGrid />
      <Voices />
      <ImpactSection />
      <FinalCTA />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero (dark) ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-[#143A8E] overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.32]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, #000 45%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, #000 45%, transparent 100%)",
        }}
      />

      {/* Floating gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "10%",
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, rgba(123,182,255,0.18), transparent 70%)",
          filter: "blur(40px)",
          animation: "float-blob-1 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          right: "10%",
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)",
          filter: "blur(40px)",
          animation: "float-blob-2 18s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">
        <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
          <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
          Selected work
          <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
        </div>

        <h1 className="mt-5 text-white font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] max-w-4xl mx-auto">
          Work that{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #7BB6FF 0%, #CDE2FE 60%, #7BB6FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ships and scales
          </span>
          .
        </h1>

        <p className="mt-5 text-blue-100/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A look at projects we&apos;ve shipped — the problems, the choices, and
          the outcomes. Real teams, real numbers.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#case-studies"
            className="group inline-flex items-center gap-2 bg-[#2783ED] hover:bg-[#1A6FD9] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(39,131,237,0.35)] hover:shadow-[0_0_32px_rgba(39,131,237,0.55)]"
          >
            See case studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <Link
            href="/schedule"
            className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all"
          >
            Start your project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Client logo strip — moving */}
        <div className="mt-14 sm:mt-16">
          <div className="text-blue-200/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-5">
            Featured clients
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="flex gap-10 sm:gap-14 w-max"
              style={{ animation: "marquee-left 35s linear infinite" }}
            >
              {[...CASES, ...CASES].map((c, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 text-white/50 text-xl sm:text-2xl font-extrabold tracking-tight select-none"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {c.client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Featured (white, premium spotlight) ───────────────────────── */

function FeaturedCase() {
  const featured = CASES.find((c) => c.featured) ?? CASES[0];

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28">

      {/* Soft ambient halo */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${featured.color}22, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        {/* Section header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            Featured case study
          </div>
          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-[3rem] leading-[1.05]">
            A closer look at{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">{featured.client}</span>
            </span>
            .
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl">
            Here&apos;s what the work looks like in practice — the problem we
            walked into, the choices we made, and what changed for the team
            once it shipped.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">

          {/* Left — cover image */}
          <div className="relative group">
            <div
              className="absolute -inset-4 rounded-3xl opacity-25 blur-2xl transition-opacity duration-700 group-hover:opacity-40 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${featured.color}, transparent 70%)` }}
            />
            <CaseCover study={featured} aspect="4/3" rounded="rounded-3xl" />

            {/* Project meta strip — sits under image. Duration/team only show
                when we have real data; year + live-site link are always shown. */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              {featured.duration && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
                  <span className="font-semibold text-slate-700">{featured.duration}</span>
                </div>
              )}
              {featured.teamSize && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
                  <span className="font-semibold text-slate-700">{featured.teamSize}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Sparkle className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
                <span className="font-semibold text-slate-700">Shipped {featured.year}</span>
              </div>
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/site inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#2783ED] transition-colors"
              >
                <span className="truncate max-w-[200px]">{featured.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right — story */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span>{featured.industry}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{featured.service}</span>
            </div>
            <h3 className="mt-3 text-slate-900 text-2xl sm:text-3xl md:text-[2.25rem] font-extrabold tracking-tight leading-[1.1]">
              {featured.headline}
            </h3>
            <p className="mt-4 text-slate-500 text-base sm:text-[17px] leading-relaxed">
              {featured.longDescription}
            </p>

            {/* Before / After mini-table — concrete, non-technical proof */}
            {featured.beforeAfter && (
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden">
                <div className="grid grid-cols-[1.2fr_1fr_1fr] text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 bg-white border-b border-slate-200">
                  <div className="px-4 py-2.5">What changed</div>
                  <div className="px-4 py-2.5">Before</div>
                  <div className="px-4 py-2.5">After</div>
                </div>
                {featured.beforeAfter.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1.2fr_1fr_1fr] text-sm ${
                      i !== featured.beforeAfter!.length - 1 ? "border-b border-slate-200/70" : ""
                    }`}
                  >
                    <div className="px-4 py-3 text-slate-700 font-medium">{row.metric}</div>
                    <div className="px-4 py-3 text-slate-400 line-through decoration-slate-300">
                      {row.before}
                    </div>
                    <div
                      className="px-4 py-3 font-extrabold tracking-tight"
                      style={{ color: featured.color }}
                    >
                      {row.after}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Client quote (only when one is on record) */}
            {featured.quote && (
              <figure className="mt-8 relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                <Quote
                  className="absolute top-4 right-4 w-6 h-6 text-slate-200"
                  strokeWidth={1.5}
                />
                <blockquote className="text-slate-700 text-[15px] sm:text-base leading-relaxed">
                  &ldquo;{featured.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${featured.quote.avatar.from}, ${featured.quote.avatar.to})`,
                    }}
                  >
                    {featured.quote.author
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{featured.quote.author}</div>
                    <div className="text-xs text-slate-500">{featured.quote.role}</div>
                  </div>
                </figcaption>
              </figure>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={`/work/${featured.id}`}
                className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                Read full case study
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold text-sm px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
              >
                Visit live site
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How we engage (white, trust signals) ───────────────────────── */

function HowWeEngage() {
  return (
    <section className="relative w-full bg-slate-50/60 overflow-hidden py-20 sm:py-24 md:py-28 border-y border-slate-200/70">

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            How we engage
          </div>
          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-[3rem] leading-[1.05]">
            What working with us{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">actually looks like</span>
            </span>
            .
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl">
            We&apos;ve worked with founders who&apos;ve never hired engineers before
            and with CTOs who&apos;ve hired hundreds. Either way, here&apos;s what stays
            the same.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100/70 flex items-center justify-center group-hover:bg-blue-100/80 transition-colors">
                  <Icon className="w-5 h-5 text-[#2783ED]" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-slate-900 text-[17px] sm:text-lg font-extrabold tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-500 text-sm sm:text-[15px] leading-relaxed">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance footer line */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex -space-x-2 shrink-0">
            {["#7BB6FF", "#A78BFA", "#34D399", "#FCD34D"].map((c, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="w-9 h-9 rounded-full border-2 border-white"
                style={{ background: `linear-gradient(135deg, ${c}, ${c}AA)` }}
              />
            ))}
          </div>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
            Most engagements start with a short, no-pressure call — usually 30
            minutes. We&apos;ll be honest about whether we&apos;re the right fit,
            even if the answer is &ldquo;not yet.&rdquo;
          </p>
          <Link
            href="/schedule"
            className="group sm:ml-auto shrink-0 inline-flex items-center gap-2 text-slate-900 hover:text-slate-700 font-semibold text-sm transition-colors"
          >
            Book that call
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Case Grid (dark) ───────────────────────── */

function CaseGrid() {
  const [industry, setIndustry] = useState<(typeof INDUSTRIES)[number]>("All");

  const filtered = useMemo(
    () => CASES.filter((c) => industry === "All" || c.industry === industry),
    [industry]
  );

  return (
    <section
      id="case-studies"
      className="relative w-full bg-[#143A8E] overflow-hidden py-20 sm:py-24 md:py-28"
    >
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

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
              <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
              All case studies
            </div>
            <h2 className="mt-4 text-white font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-4xl md:text-[2.75rem]">
              Browse by{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #7BB6FF 0%, #CDE2FE 60%, #7BB6FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                industry
              </span>
              .
            </h2>
          </div>

          <div className="text-blue-200/55 text-sm">
            Showing <span className="text-white font-semibold">{filtered.length}</span>{" "}
            of <span className="text-white font-semibold">{CASES.length}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {INDUSTRIES.map((i) => {
            const isActive = industry === i;
            const count = i === "All" ? CASES.length : CASES.filter((c) => c.industry === i).length;
            return (
              <button
                key={i}
                onClick={() => setIndustry(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-white text-slate-900 border-white"
                    : "text-blue-100/65 bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                {i}
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-slate-900/10 text-slate-600" : "bg-white/[0.06] text-blue-200/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filtered.map((c, idx) => (
            <CaseCard key={c.id} study={c} delay={idx * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ study, delay }: { study: CaseStudy; delay: number }) {
  const Icon = study.icon;
  return (
    <Link
      href={`/work/${study.id}`}
      id={study.id}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      style={{
        animation: `fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className="absolute -top-px -right-px w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at top right, ${study.color}28, transparent 65%)`,
        }}
      />
      <div
        className="absolute top-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${study.color}, transparent)`,
        }}
      />

      {/* Cover image area */}
      <div className="relative">
        <CaseCover study={study} aspect="16/9" rounded="rounded-none" variant="dark" />
        {/* Industry chip overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full backdrop-blur-md bg-black/35 text-white border border-white/15"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: study.color }}
            />
            {study.industry}
          </span>
        </div>
        {/* Icon chip in corner */}
        <div
          className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center border border-white/15 backdrop-blur-md bg-black/30"
          style={{ background: `${study.color}26` }}
        >
          <Icon className="w-[18px] h-[18px]" style={{ color: study.color }} strokeWidth={1.8} />
        </div>
      </div>

      {/* Body */}
      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight">
              {study.client}
            </h3>
            <p className="mt-1.5 text-white/85 text-sm sm:text-[15px] font-semibold leading-snug">
              {study.headline}
            </p>
          </div>
          <span className="shrink-0 w-9 h-9 rounded-full border border-white/15 group-hover:border-white/40 group-hover:bg-white/[0.06] flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </span>
        </div>

        <p className="mt-3 text-blue-100/55 text-sm leading-relaxed">
          {study.description}
        </p>

        <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {study.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-white/[0.04] text-blue-100/60 border border-white/[0.08]"
              >
                {t}
              </span>
            ))}
          </div>
          {study.stat ? (
            <div className="text-right">
              <div
                className="text-xl sm:text-2xl font-extrabold tracking-tight"
                style={{ color: study.color }}
              >
                {study.stat.value}
              </div>
              <div className="text-[10px] text-blue-200/55 uppercase tracking-wide font-semibold">
                {study.stat.label}
              </div>
            </div>
          ) : (
            <div className="text-right">
              <div
                className="font-mono text-[11px] tracking-wide truncate max-w-[160px]"
                style={{ color: study.color }}
              >
                {study.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </div>
              <div className="text-[10px] text-blue-200/55 uppercase tracking-wide font-semibold">
                Live site
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ───────────────────────── Voices (white) ───────────────────────── */

type CaseWithQuote = CaseStudy & { quote: NonNullable<CaseStudy["quote"]> };

function Voices() {
  // Only render this section when we have real client quotes on record.
  // Hiding entirely beats showing placeholder/dummy testimonials.
  const quotes: CaseWithQuote[] = CASES.filter(
    (c): c is CaseWithQuote => c.quote !== undefined,
  ).slice(0, 3);

  if (quotes.length === 0) return null;

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            In their own words
          </div>
          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-[3rem] leading-[1.05]">
            What our clients say after{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">the dust settles</span>
            </span>
            .
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl">
            The quotes below come from the people who lived through the
            projects — engineers, founders, and product leads. Not marketing
            blurbs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {quotes.map((c) => (
            <figure
              key={c.id}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col"
            >
              <div
                aria-hidden="true"
                className="absolute -top-px left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
                }}
              />
              <Quote
                className="w-7 h-7 text-slate-200"
                strokeWidth={1.5}
              />
              <blockquote className="mt-4 text-slate-700 text-[15px] sm:text-base leading-relaxed flex-1">
                &ldquo;{c.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-slate-200/70 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${c.quote.avatar.from}, ${c.quote.avatar.to})`,
                  }}
                >
                  {c.quote.author
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {c.quote.author}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{c.quote.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Impact (white, humanized) ───────────────────────── */

function ImpactSection() {
  return (
    <section className="relative w-full bg-slate-50/60 py-20 sm:py-24 md:py-28 border-y border-slate-200/70">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            By the numbers
          </div>
          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.05]">
            A decade of{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">shipped work</span>
            </span>
            .
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl">
            These aren&apos;t vanity metrics — they&apos;re what we&apos;ve
            consistently delivered across every engagement since we started.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {IMPACT_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center group-hover:bg-blue-100/80 transition-colors">
                  <Icon className="w-5 h-5 text-[#2783ED]" strokeWidth={1.8} />
                </div>
                <div className="mt-5 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1.5 text-slate-800 text-sm font-semibold">
                  {s.label}
                </div>
                <div className="mt-1 text-slate-500 text-xs sm:text-[13px] leading-relaxed">
                  {s.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA (dark) ───────────────────────── */

function FinalCTA() {
  return (
    <section className="relative w-full bg-[#143A8E] overflow-hidden py-20 sm:py-24 md:py-28">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">
        <h2 className="text-white font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto">
          Have a project worth{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #7BB6FF 0%, #CDE2FE 60%, #7BB6FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            building well
          </span>
          ?
        </h2>
        <p className="mt-5 text-blue-100/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Let&apos;s talk about what you&apos;re building, who it&apos;s for, and how we
          can help ship it.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/schedule"
            className="group inline-flex items-center gap-2 bg-[#2783ED] hover:bg-[#1A6FD9] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(39,131,237,0.35)] hover:shadow-[0_0_32px_rgba(39,131,237,0.55)]"
          >
            Start your project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="mailto:hello@igknight.tech"
            className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all"
          >
            Email the team
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Shared: Case cover (image w/ graceful fallback) ───────────────────────── */

function CaseCover({
  study,
  aspect,
  rounded,
  variant = "light",
}: {
  study: CaseStudy;
  aspect: "4/3" | "16/9";
  rounded: string;
  variant?: "light" | "dark";
}) {
  const Icon = study.icon;
  const aspectClass = aspect === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]";

  // Background-image keeps things graceful when the file isn't dropped in yet —
  // browser silently shows the fallback layers below.
  const bg = study.cover ? `url(${study.cover})` : undefined;

  const isLight = variant === "light";

  return (
    <div
      className={`relative ${aspectClass} ${rounded} overflow-hidden ${
        isLight
          ? "border border-slate-200 bg-gradient-to-br from-slate-50 to-white"
          : "border-b border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent"
      }`}
    >
      {/* Layer 1 — abstract bars fallback (always rendered, sits behind image) */}
      <div className="absolute inset-0 grid grid-cols-6 gap-3 p-5">
        {Array.from({ length: 24 }).map((_, i) => {
          const h = Math.sin(i * 0.7) * 40 + 60;
          return (
            <div
              key={i}
              className="rounded-md"
              style={{
                height: `${h}%`,
                background:
                  i % 7 === 0
                    ? `linear-gradient(180deg, ${study.color}AA, ${study.color}33)`
                    : isLight
                      ? "rgba(15,23,42,0.04)"
                      : "rgba(255,255,255,0.04)",
                alignSelf: "end",
              }}
            />
          );
        })}
      </div>

      {/* Layer 2 — center icon badge (still part of the fallback look) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(15,23,42,0.12)] ${
            isLight ? "bg-white" : "bg-[#143A8E]"
          }`}
        >
          <Icon
            className="w-8 h-8"
            style={{ color: study.color }}
            strokeWidth={1.6}
          />
        </div>
      </div>

      {/* Layer 3 — real image when path is set. Sits on top, hides the fallback. */}
      {bg && (
        <div
          aria-label={`${study.client} cover`}
          role="img"
          className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ backgroundImage: bg }}
        />
      )}

      {/* Layer 4 — subtle bottom gradient for dark variant readability */}
      {!isLight && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,31,85,0) 50%, rgba(14,31,85,0.5) 100%)",
          }}
        />
      )}
    </div>
  );
}
