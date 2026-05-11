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
  type LucideIcon,
} from "lucide-react";

type Stat = { value: string; label: string; icon: LucideIcon };
const IMPACT_STATS: Stat[] = [
  { value: "50+",    label: "Products shipped",            icon: Trophy },
  { value: "$2.4B+", label: "Client revenue impact",       icon: TrendingUp },
  { value: "12",     label: "Countries served",            icon: Globe },
  { value: "96%",    label: "Projects delivered on time",  icon: Clock },
];

/* ───────────────────────── Page ───────────────────────── */

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCase />
      <CaseGrid />
      <ImpactSection />
      <FinalCTA />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero (dark) ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-[#0C1C3D] overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">

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
              backgroundImage: "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
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
            className="group inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)]"
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

/* ───────────────────────── Featured (white) ───────────────────────── */

function FeaturedCase() {
  const featured = CASES.find((c) => c.featured) ?? CASES[0];
  const Icon = featured.icon;

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            Featured case study
          </div>
          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-[3rem] leading-[1.05]">
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">{featured.client}</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">

          {/* Left — text */}
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              <span>{featured.industry}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{featured.service}</span>
            </div>
            <h3 className="mt-3 text-slate-900 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1]">
              {featured.headline}
            </h3>
            <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
              {featured.description}
            </p>

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

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div>
                <div
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                  style={{ color: featured.color }}
                >
                  {featured.stat.value}
                </div>
                <div className="mt-0.5 text-slate-500 text-xs uppercase tracking-wide font-semibold">
                  {featured.stat.label}
                </div>
              </div>

              <Link
                href={`/work/${featured.id}`}
                className="group inline-flex items-center gap-2 text-slate-900 hover:text-slate-700 font-semibold text-sm transition-colors"
              >
                Read full case study
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative group">
            <div
              className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition-opacity duration-700 group-hover:opacity-50"
              style={{ background: `radial-gradient(circle, ${featured.color}, transparent 70%)` }}
            />
            <Link
              href={`/work/${featured.id}`}
              className="relative block aspect-[4/3] rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden hover:border-slate-300 transition-all duration-300"
            >
              <div className="absolute inset-0 grid grid-cols-6 gap-3 p-6">
                {Array.from({ length: 24 }).map((_, i) => {
                  const h = Math.sin(i * 0.7) * 40 + 60;
                  return (
                    <div
                      key={i}
                      className="rounded-md transition-transform duration-500 group-hover:translate-y-[-2px]"
                      style={{
                        height: `${h}%`,
                        background:
                          i % 7 === 0
                            ? `linear-gradient(180deg, ${featured.color}AA, ${featured.color}33)`
                            : "rgba(15,23,42,0.04)",
                        alignSelf: "end",
                        transitionDelay: `${i * 15}ms`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(15,23,42,0.12)] bg-white group-hover:scale-110 transition-transform duration-500">
                  <Icon
                    className="w-10 h-10"
                    style={{ color: featured.color }}
                    strokeWidth={1.6}
                  />
                </div>
              </div>
            </Link>
          </div>
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
      className="relative w-full bg-[#0C1C3D] overflow-hidden py-20 sm:py-24 md:py-28"
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
                  backgroundImage: "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
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
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden p-6 sm:p-7"
      style={{
        animation: `fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className="absolute -top-px -right-px w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${study.color}28, transparent 65%)`,
        }}
      />
      <div
        className="absolute top-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${study.color}, transparent)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.08]"
            style={{ background: `${study.color}18` }}
          >
            <Icon className="w-5 h-5" style={{ color: study.color }} strokeWidth={1.8} />
          </div>
          <span className="w-9 h-9 rounded-full border border-white/15 group-hover:border-white/40 group-hover:bg-white/[0.06] flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200/55">
          <span>{study.industry}</span>
          <span className="w-1 h-1 rounded-full bg-blue-300/40" />
          <span>{study.service}</span>
        </div>

        <h3 className="mt-2 text-white text-xl sm:text-2xl font-extrabold tracking-tight">
          {study.client}
        </h3>
        <p className="mt-1.5 text-white/85 text-sm sm:text-[15px] font-semibold leading-snug">
          {study.headline}
        </p>
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
        </div>
      </div>
    </Link>
  );
}

/* ───────────────────────── Impact (white) ───────────────────────── */

function ImpactSection() {
  return (
    <section className="relative w-full bg-white py-20 sm:py-24 md:py-28">
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
                  <Icon className="w-5 h-5 text-[#4f9ef8]" strokeWidth={1.8} />
                </div>
                <div className="mt-5 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1.5 text-slate-500 text-xs sm:text-sm font-medium">
                  {s.label}
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
    <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-20 sm:py-24 md:py-28">
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
              backgroundImage: "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
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
            className="group inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)]"
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
