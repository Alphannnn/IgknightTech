"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { INDUSTRIES, type Industry } from "./industries";
import { CASES } from "../work/cases";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
} from "lucide-react";

/* ───────────────────────── Page ───────────────────────── */

export default function SolutionsPage() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);

  // Honor hash on initial load (e.g., navbar links: /solutions#fintech-banking)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash && INDUSTRIES.find((i) => i.id === hash)) {
      setActiveId(hash);
    }
  }, []);

  const setActive = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const active = INDUSTRIES.find((i) => i.id === activeId) ?? INDUSTRIES[0];

  return (
    <>
      <Navbar />
      <Hero />
      <Explorer activeId={activeId} setActiveId={setActive} active={active} />
      <FinalCTA />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-14">

      {/* Multi-color floating orbs (industry palette) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-[10%] w-[420px] h-[420px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
        />
        <div
          className="absolute top-[20%] left-[40%] w-[380px] h-[380px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: "radial-gradient(circle, #34D399, transparent 70%)" }}
        />
        <div
          className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: "radial-gradient(circle, #F472B6, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-10 right-[35%] w-[360px] h-[360px] rounded-full opacity-[0.16] blur-3xl"
          style={{ background: "radial-gradient(circle, #FCD34D, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">
        <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
          Solutions
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
        </div>

        <h1 className="mt-5 text-slate-900 font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] max-w-4xl mx-auto">
          Built for your{" "}
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
            />
            <span className="relative">industry</span>
          </span>
          .
        </h1>

        <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Tailored expertise across regulated and high-growth sectors — pick
          yours to see how we work.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Explorer (sidebar + content) ───────────────────────── */

function Explorer({
  activeId,
  setActiveId,
  active,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
  active: Industry;
}) {
  return (
    <section className="relative w-full bg-white pb-20 sm:pb-24">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-12">

          {/* ── Sidebar (industry list) ── */}
          <aside className="lg:sticky lg:top-20 self-start">
            <div className="lg:hidden text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
              Industries
            </div>

            <nav className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible -mx-5 lg:mx-0 px-5 lg:px-0 pb-2 lg:pb-0 scrollbar-none">
              {INDUSTRIES.map((ind) => {
                const Icon = ind.icon;
                const isActive = activeId === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveId(ind.id)}
                    className={`group relative flex items-center gap-3 flex-shrink-0 lg:w-full text-left py-3 px-4 lg:px-5 rounded-xl transition-all duration-300 border ${
                      isActive
                        ? "bg-white border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
                        : "bg-transparent border-transparent hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Active left accent */}
                    <span
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-all duration-300"
                      style={{
                        background: ind.color,
                        opacity: isActive ? 1 : 0,
                        transform: `scaleY(${isActive ? 1 : 0})`,
                        transformOrigin: "center",
                      }}
                    />

                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        background: isActive ? `${ind.color}1A` : "#F1F5F9",
                      }}
                    >
                      <Icon
                        className="w-4 h-4 transition-colors"
                        style={{ color: isActive ? ind.color : "#64748B" }}
                        strokeWidth={1.9}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-bold tracking-tight transition-colors ${
                          isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                        }`}
                      >
                        {ind.title}
                      </div>
                    </div>

                    {/* Active dot indicator */}
                    {isActive && (
                      <span
                        className="hidden lg:inline-flex w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: ind.color,
                          boxShadow: `0 0 8px ${ind.color}`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ── Content panel (live-updating) ── */}
          <div key={active.id} className="relative" style={{ animation: "fade-up 0.4s ease-out" }}>
            <IndustryContent industry={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Industry content panel ───────────────────────── */

function IndustryContent({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  const relatedCases = CASES.filter((c) => industry.relatedCases.includes(c.id));

  return (
    <div className="space-y-8">

      {/* Header card with accent treatment */}
      <div
        className="relative rounded-3xl border border-slate-200 overflow-hidden p-6 sm:p-8 md:p-10"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 100% 0%, ${industry.color}15 0%, transparent 60%)`,
        }}
      >
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${industry.color}, transparent 70%)` }}
        />

        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
                style={{ background: `linear-gradient(135deg, ${industry.color}15, white)` }}
              >
                <Icon className="w-6 h-6" style={{ color: industry.color }} strokeWidth={1.7} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Industry · {industry.relatedCases.length} case
                {industry.relatedCases.length === 1 ? "" : "s"}
              </span>
            </div>

            <h2 className="mt-5 text-slate-900 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold tracking-tight leading-[1.05]">
              {industry.title}
            </h2>
            <p className="mt-3 text-slate-700 text-base sm:text-lg font-semibold">
              {industry.tagline}
            </p>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
              {industry.description}
            </p>
          </div>

          {/* Stat */}
          <div className="text-right flex-shrink-0">
            <div
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: industry.color }}
            >
              {industry.stat.value}
            </div>
            <div className="mt-1 text-slate-500 text-[10px] uppercase tracking-wide font-semibold">
              {industry.stat.label}
            </div>
          </div>
        </div>
      </div>

      {/* Challenges grid */}
      <div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
          <span className="h-px w-6 bg-slate-300" />
          What we solve
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {industry.challenges.map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: industry.color,
                    boxShadow: `0 0 0 3px ${industry.color}22`,
                  }}
                />
                <div>
                  <h3 className="text-slate-900 text-sm sm:text-base font-bold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-slate-500 text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities + Compliance row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* Capabilities */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
            <span className="h-px w-6 bg-slate-300" />
            What we deliver
          </div>
          <ul className="space-y-2.5">
            {industry.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-2.5 text-slate-700 text-sm">
                <span
                  className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${industry.color}1F`, border: `1px solid ${industry.color}40` }}
                >
                  <Check className="w-2.5 h-2.5" style={{ color: industry.color }} strokeWidth={3} />
                </span>
                {cap}
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50/50 to-white p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
            <ShieldCheck className="w-3 h-3" />
            Compliance
          </div>
          <div className="flex flex-wrap gap-2">
            {industry.compliance.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-tight px-3 py-1.5 rounded-md bg-white text-slate-700 border border-slate-200"
              >
                <ShieldCheck className="w-3 h-3" style={{ color: industry.color }} />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related case studies */}
      {relatedCases.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              <span className="h-px w-6 bg-slate-300" />
              Proof in this industry
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
            >
              All work
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedCases.map((c) => {
              const CIcon = c.icon;
              return (
                <Link
                  key={c.id}
                  href={`/work/${c.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200"
                      style={{ background: `${c.color}15` }}
                    >
                      <CIcon className="w-5 h-5" style={{ color: c.color }} strokeWidth={1.8} />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="mt-3 text-slate-900 text-base font-bold tracking-tight">
                    {c.client}
                  </h3>
                  <p className="mt-1 text-slate-500 text-sm leading-snug">
                    {c.headline}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Industry CTA */}
      <div
        className="relative rounded-2xl border overflow-hidden p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          background: `linear-gradient(135deg, ${industry.color}10, white)`,
          borderColor: `${industry.color}30`,
        }}
      >
        <div>
          <h3 className="text-slate-900 text-lg sm:text-xl font-extrabold tracking-tight">
            Have a {industry.title.toLowerCase()} project?
          </h3>
          <p className="mt-1 text-slate-500 text-sm leading-relaxed">
            Tell us where you are. We&apos;ll share what we&apos;d do — and what to avoid.
          </p>
        </div>
        <Link
          href="/schedule"
          className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all whitespace-nowrap shadow-[0_4px_16px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.25)]"
        >
          Schedule a call
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */

function FinalCTA() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-14 text-center"
          style={{
            background: "linear-gradient(135deg, #0F1F45 0%, #0C1C3D 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,182,255,0.20) 0%, transparent 70%)",
            }}
          />

          <h2 className="relative text-white font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto">
            Don&apos;t see your{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #7BB6FF, #BFD9FF, #7BB6FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              industry
            </span>
            ?
          </h2>
          <p className="relative mt-5 text-blue-100/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            We&apos;ve probably shipped something adjacent. Tell us about your space —
            we&apos;ll be honest about whether we can help.
          </p>

          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.4)] hover:shadow-[0_0_32px_rgba(79,158,248,0.6)]"
            >
              Schedule a call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all"
            >
              See our work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
