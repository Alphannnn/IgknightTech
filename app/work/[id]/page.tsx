"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CASES } from "../cases";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Users,
  Briefcase,
  Quote,
} from "lucide-react";

export default function CaseStudyDetail() {
  const params = useParams();
  const id = params.id as string;
  const study = CASES.find((c) => c.id === id);

  if (!study) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] bg-[#0C1C3D] flex items-center justify-center text-center px-5">
          <div>
            <div className="text-blue-200/50 text-sm font-bold uppercase tracking-[0.22em]">
              404 · Not found
            </div>
            <h1 className="mt-3 text-white text-4xl font-extrabold tracking-tight">
              Case study not found
            </h1>
            <p className="mt-3 text-blue-100/60 max-w-md mx-auto">
              The case study you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <Link
              href="/work"
              className="mt-6 inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              See all case studies
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const Icon = study.icon;
  const related = CASES.filter((c) => c.id !== study.id).slice(0, 3);

  return (
    <>
      <Navbar />

      {/* ─────── Top bar ─────── */}
      <div className="bg-[#0C1C3D] border-b border-white/[0.06]">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 h-14 flex items-center justify-between">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-blue-100/55 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All case studies
          </Link>
          <span className="text-blue-200/40 text-xs font-mono">
            Case · {study.year}
          </span>
        </div>
      </div>

      {/* ─────── Hero ─────── */}
      <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.32]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 50%, #000 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 50%, #000 45%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 40% at 50% 0%, ${study.color}28 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-12 items-center">

            {/* Left */}
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200/70">
                <span>{study.industry}</span>
                <span className="w-1 h-1 rounded-full bg-blue-300/40" />
                <span>{study.service}</span>
              </div>

              <h1 className="mt-4 text-white font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-[3.5rem]">
                {study.client}
              </h1>

              <p className="mt-3 text-white/85 text-xl sm:text-2xl font-semibold leading-snug">
                {study.headline}
              </p>

              <p className="mt-5 text-blue-100/60 text-base sm:text-lg leading-relaxed max-w-xl">
                {study.longDescription}
              </p>
            </div>

            {/* Right — stat card */}
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl opacity-30 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${study.color}, transparent 70%)`,
                }}
              />
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10 text-center">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-white/[0.08]"
                  style={{ background: `${study.color}1F` }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: study.color }}
                    strokeWidth={1.6}
                  />
                </div>
                <div
                  className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight"
                  style={{ color: study.color }}
                >
                  {study.stat.value}
                </div>
                <div className="mt-2 text-blue-100/65 text-sm font-semibold uppercase tracking-[0.15em]">
                  {study.stat.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Project Meta strip ─────── */}
      <section className="relative w-full bg-white border-b border-slate-100 py-8 sm:py-10">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            <Meta icon={Briefcase} label="Client" value={study.client} />
            <Meta icon={Calendar} label="Duration" value={study.duration} />
            <Meta icon={Users} label="Team" value={study.teamSize} />
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                <Briefcase className="w-3 h-3" />
                Stack
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {study.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Challenge ─────── */}
      <section className="relative w-full bg-white py-20 sm:py-24">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                <span className="h-px w-6 bg-slate-300" />
                The challenge
              </div>
              <h2 className="mt-4 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1]">
                {study.challenge.title}
              </h2>
            </div>
            <div>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {study.challenge.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {study.challenge.pain.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-slate-700 text-sm sm:text-[15px]"
                  >
                    <span
                      className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: study.color }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Approach ─────── */}
      <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-20 sm:py-24">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/80">
              <span className="h-px w-6 bg-blue-300/50" />
              Our approach
            </div>
            <h2 className="mt-4 text-white text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
              {study.approach.title}
            </h2>
            <p className="mt-4 text-blue-100/60 text-base sm:text-lg leading-relaxed">
              {study.approach.body}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-white/[0.08]" />

            <div className="space-y-5">
              {study.approach.steps.map((s) => (
                <div key={s.num} className="relative pl-14">
                  <div
                    className="absolute left-0 top-0 w-11 h-11 rounded-full bg-[#0F1F45] border border-white/15 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                  >
                    <span
                      className="text-xs font-black tracking-wider"
                      style={{ color: study.color }}
                    >
                      {s.num}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                    <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-blue-100/60 text-sm leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Results ─────── */}
      <section className="relative w-full bg-white py-20 sm:py-24">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-px w-6 bg-slate-300" />
              Results
            </div>
            <h2 className="mt-4 text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
              What we{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
                />
                <span className="relative">shipped</span>
              </span>
              .
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {study.results.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                <div
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                  style={{ color: study.color }}
                >
                  {r.value}
                </div>
                <div className="mt-2 text-slate-900 text-sm font-bold tracking-tight">
                  {r.label}
                </div>
                <p className="mt-1.5 text-slate-500 text-xs sm:text-[13px] leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── Quote ─────── */}
      <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-20 sm:py-24">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 60% at 50% 50%, #000 45%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 md:px-10 text-center">
          <Quote
            className="w-10 h-10 mx-auto"
            style={{ color: study.color, opacity: 0.6 }}
            strokeWidth={1.5}
            fill="currentColor"
          />
          <blockquote className="mt-6 text-white text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.3]">
            &ldquo;{study.quote.text}&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white/10"
              style={{
                background: `linear-gradient(135deg, ${study.quote.avatar.from}, ${study.quote.avatar.to})`,
              }}
            >
              {study.quote.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-sm">
                {study.quote.author}
              </div>
              <div className="text-blue-100/55 text-xs">{study.quote.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Related work ─────── */}
      <section className="relative w-full bg-white py-20 sm:py-24">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                <span className="h-px w-6 bg-slate-300" />
                More work
              </div>
              <h2 className="mt-3 text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Related case studies
              </h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold text-sm transition-colors flex-shrink-0"
            >
              All work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <Link
                  key={r.id}
                  href={`/work/${r.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200"
                    style={{ background: `${r.color}15` }}
                  >
                    <RIcon className="w-5 h-5" style={{ color: r.color }} strokeWidth={1.8} />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    <span>{r.industry}</span>
                  </div>
                  <h3 className="mt-1 text-slate-900 text-lg font-bold tracking-tight">
                    {r.client}
                  </h3>
                  <p className="mt-1.5 text-slate-500 text-sm leading-snug">
                    {r.headline}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-slate-700 group-hover:text-slate-900 text-xs font-semibold transition-colors">
                    Read case study
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────── CTA ─────── */}
      <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-20 sm:py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 40% at 50% 0%, ${study.color}25 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">
          <h2 className="text-white font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto">
            Have a project like{" "}
            <span style={{ color: study.color }}>{study.client}&apos;s</span>?
          </h2>
          <p className="mt-5 text-blue-100/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Let&apos;s talk about what you&apos;re building. We&apos;ll share what we&apos;d do
            differently, what to watch out for, and how we can help.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)]"
            >
              Schedule a call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all"
            >
              Browse all work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ── Meta row component ── */
function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="mt-2 text-slate-900 text-base font-bold tracking-tight">
        {value}
      </div>
    </div>
  );
}
