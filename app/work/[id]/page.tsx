"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CASES } from "../cases";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Briefcase,
  Quote,
  ExternalLink,
  Globe,
} from "lucide-react";

export default function CaseStudyDetail() {
  const params = useParams();
  const id = params.id as string;
  const study = CASES.find((c) => c.id === id);

  if (!study) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] bg-[#143A8E] flex items-center justify-center text-center px-5">
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
              className="mt-6 inline-flex items-center gap-2 bg-[#2783ED] hover:bg-[#1A6FD9] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
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

  // Pretty hostname for live-site link: drop scheme + trailing slash
  const prettyHost = study.url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <>
      <Navbar />

      {/* ─────── Top bar ─────── */}
      <div className="bg-[#143A8E] border-b border-white/[0.06]">
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
      <section className="relative w-full bg-[#143A8E] overflow-hidden py-16 sm:py-20 lg:py-24">
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

              {/* Live site CTA */}
              <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-5 py-3 rounded-lg transition-all"
                  style={{
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.5) inset, 0 0 0 1px rgba(255,255,255,0.06), 0 12px 28px -10px rgba(123,182,255,0.4)",
                  }}
                >
                  Visit live site
                  <ExternalLink
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    strokeWidth={2}
                  />
                </a>
                <span className="font-mono text-[12px] text-blue-200/50">
                  {prettyHost}
                </span>
              </div>
            </div>

            {/* Right — cover image or icon-only card */}
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl opacity-30 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${study.color}, transparent 70%)`,
                }}
              />
              <HeroVisualSlot study={study} Icon={Icon} prettyHost={prettyHost} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Project Meta strip ─────── */}
      <section className="relative w-full bg-white border-b border-slate-100 py-8 sm:py-10">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            <Meta icon={Briefcase} label="Client" value={study.client} />
            <Meta icon={Calendar} label="Year" value={study.year} />

            <MetaCustom icon={Globe} label="Live site">
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-slate-900 text-base font-bold tracking-tight hover:text-[#2783ED] transition-colors"
              >
                <span className="truncate max-w-[180px]">{prettyHost}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2783ED] transition-colors flex-shrink-0" />
              </a>
            </MetaCustom>

            {study.tech.length > 0 ? (
              <MetaCustom icon={Briefcase} label="Stack">
                <div className="flex flex-wrap gap-1.5">
                  {study.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </MetaCustom>
            ) : (
              <Meta icon={Briefcase} label="Service" value={study.service} />
            )}
          </div>
        </div>
      </section>

      {/* ─────── Role / contributions strip ─────── */}
      {study.role.length > 0 && (
        <section className="relative w-full bg-white border-b border-slate-100 py-6">
          <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 shrink-0">
                Role
              </span>
              <div className="flex flex-wrap gap-2">
                {study.role.map((r) => (
                  <span
                    key={r}
                    className="text-[12px] font-semibold px-3 py-1 rounded-full border"
                    style={{
                      background: `${study.color}10`,
                      borderColor: `${study.color}30`,
                      color: study.color,
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────── Challenge (optional) ─────── */}
      {study.challenge && (
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
      )}

      {/* ─────── Approach (optional) ─────── */}
      {study.approach && (
        <section className="relative w-full bg-[#143A8E] overflow-hidden py-20 sm:py-24">
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
                    <div className="absolute left-0 top-0 w-11 h-11 rounded-full bg-[#1B49A8] border border-white/15 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
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
      )}

      {/* ─────── Results (optional) ─────── */}
      {study.results && study.results.length > 0 && (
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
      )}

      {/* ─────── Quote (optional) ─────── */}
      {study.quote && (
        <section className="relative w-full bg-[#143A8E] overflow-hidden py-20 sm:py-24">
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
      )}

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
      <section className="relative w-full bg-[#143A8E] overflow-hidden py-20 sm:py-24">
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
              className="group inline-flex items-center gap-2 bg-[#2783ED] hover:bg-[#1A6FD9] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(39,131,237,0.35)] hover:shadow-[0_0_32px_rgba(39,131,237,0.55)]"
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

/* ── Hero visual slot ──
   If cover image exists AND loads, show it. Otherwise fall back to an
   icon-only branded card so the layout never breaks while images are
   being added. */
function HeroVisualSlot({
  study,
  Icon,
  prettyHost,
}: {
  study: { color: string; cover?: string; client: string; stat?: { value: string; label: string } };
  Icon: typeof Briefcase;
  prettyHost: string;
}) {
  const [imageOk, setImageOk] = useState(Boolean(study.cover));

  if (study.cover && imageOk) {
    return (
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-[#1B49A8]"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.08) inset, 0 18px 60px -18px rgba(14,31,85,0.55)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent z-10"
        />
        <Image
          src={study.cover}
          alt={`${study.client} — cover`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          onError={() => setImageOk(false)}
        />
      </div>
    );
  }

  // No cover (or load failed) — clean icon-only fallback.
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10 text-center aspect-[16/10] flex flex-col items-center justify-center">
      <span
        aria-hidden="true"
        className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      {study.stat ? (
        <>
          <div
            className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-white/[0.08]"
            style={{ background: `${study.color}1F` }}
          >
            <Icon className="w-8 h-8" style={{ color: study.color }} strokeWidth={1.6} />
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
        </>
      ) : (
        <>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/[0.08]"
            style={{ background: `${study.color}1F` }}
          >
            <Icon className="w-8 h-8" style={{ color: study.color }} strokeWidth={1.6} />
          </div>
          <div
            className="mt-6 text-white text-2xl font-bold tracking-tight"
          >
            {study.client}
          </div>
          <div className="mt-1 font-mono text-blue-100/50 text-xs tracking-wide">
            {prettyHost}
          </div>
        </>
      )}
    </div>
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

function MetaCustom({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Briefcase;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
