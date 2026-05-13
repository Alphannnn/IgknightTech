"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SERVICES } from "../services-data";
import { CASES } from "../../work/cases";
import { ServicePreview } from "../ServicePreview";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
} from "lucide-react";

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const serviceIndex = SERVICES.findIndex((s) => s.id === id);
  const service = SERVICES[serviceIndex];

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] bg-[#0C1C3D] flex items-center justify-center text-center px-5">
          <div>
            <div className="text-blue-200/50 text-sm font-bold uppercase tracking-[0.22em]">
              404 · Not found
            </div>
            <h1 className="mt-3 text-white text-4xl font-extrabold tracking-tight">
              Service not found
            </h1>
            <p className="mt-3 text-blue-100/60 max-w-md mx-auto">
              The service you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              See all services
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const Icon = service.icon;
  const relatedCases = CASES.filter((c) => service.relatedCases.includes(c.id));
  const otherServices = SERVICES.filter((s) => s.id !== service.id);
  const total = SERVICES.length;
  const indexLabel = `${String(serviceIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const prevService = SERVICES[(serviceIndex - 1 + total) % total];
  const nextService = SERVICES[(serviceIndex + 1) % total];

  return (
    <>
      <Navbar />

      {/* Top bar */}
      <div className="bg-[#0C1C3D] border-b border-white/[0.06]">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 h-14 flex items-center justify-between">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-blue-100/55 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All services
          </Link>
          <span className="font-mono text-blue-200/40 text-xs tabular-nums">
            {indexLabel} · {service.navTag}
          </span>
        </div>
      </div>

      {/* ─────── Hero (dark, editorial) ─────── */}
      <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-16 sm:py-20 lg:py-28">
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
            background: `radial-gradient(ellipse 55% 40% at 50% 0%, ${service.color}28 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
                <span className="font-mono tabular-nums text-blue-300/60">
                  {indexLabel}
                </span>
                <span className="h-px w-6 sm:w-8 bg-blue-300/40" />
                <span>{service.navTag}</span>
              </div>

              <h1 className="mt-5 text-white font-extrabold tracking-tight leading-[1.02] text-4xl sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem]">
                {service.title}
              </h1>

              <p className="mt-4 text-white/90 text-xl sm:text-2xl font-semibold leading-snug max-w-xl">
                {service.tagline}
              </p>

              <p className="mt-6 text-blue-100/60 text-base sm:text-lg leading-relaxed max-w-xl">
                {service.longDescription}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  href="/schedule"
                  className="group inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)]"
                >
                  Start a project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="#outcomes"
                  className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all"
                >
                  What you&apos;ll have
                  <ArrowRight className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right — illustrated preview + stat + timeframe */}
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-3xl opacity-30 blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${service.color}, transparent 70%)` }}
              />
              <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">

                {/* Top: service preview illustration */}
                <div className="relative aspect-[4/3] border-b border-white/[0.06]">
                  <ServicePreview service={service} rounded="rounded-none" />

                  {/* Icon chip overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center border backdrop-blur-md"
                      style={{
                        background: `${service.color}26`,
                        borderColor: `${service.color}40`,
                      }}
                    >
                      <Icon
                        className="w-4.5 h-4.5"
                        style={{ color: service.color, width: 18, height: 18 }}
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full backdrop-blur-md bg-white/10 text-white/85 border border-white/15">
                      {service.navTag}
                    </span>
                  </div>
                </div>

                {/* Middle: hero stat */}
                <div className="px-6 sm:px-8 py-6 sm:py-7 text-center">
                  <div
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                    style={{ color: service.color }}
                  >
                    {service.stat.value}
                  </div>
                  <div className="mt-1.5 text-blue-100/65 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">
                    {service.stat.label}
                  </div>
                </div>

                {/* Bottom: timeframe band */}
                <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-200/60 text-[11px] font-bold uppercase tracking-[0.18em]">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.8} />
                    First outcomes in
                  </div>
                  <div
                    className="text-sm font-bold tracking-tight"
                    style={{ color: service.color }}
                  >
                    {service.outcomes.timeframe}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Outcomes (off-white, the trust-builder for non-tech buyers) ─────── */}
      <section
        id="outcomes"
        className="relative w-full bg-[#FAFAF8] overflow-hidden py-20 sm:py-24 border-b border-slate-200/70"
      >
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
            {/* Left: heading + timeframe */}
            <div>
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
                <span className="h-px w-6 sm:w-8 bg-slate-300" />
                Outcomes
              </div>
              <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.05]">
                What you&apos;ll have in{" "}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 rounded-[3px]"
                    style={{ background: `${service.color}80` }}
                  />
                  <span className="relative">{service.outcomes.timeframe}</span>
                </span>
                .
              </h2>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-md">
                Not slides. Not a kick-off deck. Concrete artifacts you can
                touch, click, and show your team.
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 max-w-sm">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.8} />
                  Average start
                </div>
                <p className="mt-2 text-slate-700 text-sm leading-relaxed">
                  Most engagements move from first call to kick-off in{" "}
                  <span className="font-bold text-slate-900">5 – 10 business days</span>,
                  contracts permitting.
                </p>
              </div>
            </div>

            {/* Right: numbered outcomes list */}
            <ol className="space-y-0">
              {service.outcomes.delivers.map((line, i) => (
                <li
                  key={i}
                  className={`grid grid-cols-[40px_1fr] gap-5 py-6 sm:py-7 ${
                    i !== service.outcomes.delivers.length - 1
                      ? "border-b border-slate-200/70"
                      : ""
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${service.color}1A` }}
                  >
                    <Check
                      className="w-4 h-4"
                      style={{ color: service.color }}
                      strokeWidth={2.4}
                    />
                  </div>
                  <p className="text-slate-700 text-base sm:text-[17px] leading-relaxed pt-1">
                    {line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─────── Capabilities (white) ─────── */}
      <section id="capabilities" className="relative w-full bg-white py-20 sm:py-24">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-px w-6 bg-slate-300" />
              What we deliver
            </div>
            <h2 className="mt-4 text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
              Four core{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
                />
                <span className="relative">capabilities</span>
              </span>
              .
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {service.capabilities.map((c, i) => {
              const CIcon = c.icon;
              return (
                <article
                  key={c.title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-px -right-px w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${service.color}1F, transparent 65%)`,
                    }}
                  />
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200"
                      style={{ background: `${service.color}15` }}
                    >
                      <CIcon
                        className="w-5 h-5"
                        style={{ color: service.color }}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-300 text-xs tabular-nums">
                          0{i + 1}
                        </span>
                        <h3 className="text-slate-900 text-base sm:text-lg font-bold tracking-tight">
                          {c.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-slate-500 text-sm leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────── Process (dark) ─────── */}
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
              How we work
            </div>
            <h2 className="mt-4 text-white text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
              Our{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                process
              </span>
              .
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-white/[0.08]" />
            <div className="space-y-5">
              {service.process.map((s) => (
                <div key={s.num} className="relative pl-14">
                  <div className="absolute left-0 top-0 w-11 h-11 rounded-full bg-[#0F1F45] border border-white/15 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
                    <span
                      className="text-xs font-black tracking-wider"
                      style={{ color: service.color }}
                    >
                      {s.num}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                    <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-blue-100/60 text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────── Stack (white, grouped) ─────── */}
      <section className="relative w-full bg-white py-20 sm:py-24">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-px w-6 bg-slate-300" />
              Stack
            </div>
            <h2 className="mt-4 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.05]">
              Our tools of choice.
            </h2>
            <p className="mt-3 text-slate-500 text-base sm:text-lg leading-relaxed">
              We pick boring technology where we can and novel technology where
              it matters — always optimizing for what your team can maintain.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {service.stackGroups.map((group, i) => (
              <div
                key={group.category}
                className={`grid grid-cols-1 sm:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] gap-3 sm:gap-6 px-5 sm:px-7 py-5 sm:py-6 ${
                  i !== service.stackGroups.length - 1
                    ? "border-b border-slate-200/80"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: service.color }}
                  />
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-bold tracking-tight px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── Related case studies (dark) ─────── */}
      {relatedCases.length > 0 && (
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

            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/80">
                  <span className="h-px w-6 bg-blue-300/50" />
                  Proof
                </div>
                <h2 className="mt-3 text-white text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Case studies in this discipline
                </h2>
              </div>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-blue-100/65 hover:text-white font-semibold text-sm transition-colors flex-shrink-0"
              >
                All work
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {relatedCases.map((c) => {
                const CIcon = c.icon;
                return (
                  <Link
                    key={c.id}
                    href={`/work/${c.id}`}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.08]"
                        style={{ background: `${c.color}18` }}
                      >
                        <CIcon
                          className="w-5 h-5"
                          style={{ color: c.color }}
                          strokeWidth={1.8}
                        />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200/55">
                      <span>{c.industry}</span>
                      <span className="w-1 h-1 rounded-full bg-blue-300/40" />
                      <span>{c.service}</span>
                    </div>
                    <h3 className="mt-1 text-white text-xl font-extrabold tracking-tight">
                      {c.client}
                    </h3>
                    <p className="mt-1.5 text-white/85 text-sm font-semibold leading-snug">
                      {c.headline}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-blue-100/65 group-hover:text-white text-xs font-semibold transition-colors">
                      Read case study
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─────── Other services + CTA (white) ─────── */}
      <section className="relative w-full bg-white py-20 sm:py-24">
        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

          <div className="mb-12">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="h-px w-6 bg-slate-300" />
              Often paired with
            </div>
            <h2 className="mt-3 text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
              {service.title}, in context
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {otherServices.slice(0, 3).map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200"
                    style={{ background: `${s.color}15` }}
                  >
                    <SIcon
                      className="w-5 h-5"
                      style={{ color: s.color }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <h3 className="mt-4 text-slate-900 text-base font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-slate-500 text-sm leading-snug">
                    {s.tagline}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-slate-700 group-hover:text-slate-900 text-xs font-semibold transition-colors">
                    Explore
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Prev / next service navigation */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/services/${prevService.id}`}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all duration-300 p-5 flex items-center gap-4"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 group-hover:text-slate-700 transition-all" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Previous
                </div>
                <div className="mt-0.5 text-slate-900 text-sm sm:text-base font-bold tracking-tight truncate">
                  {prevService.title}
                </div>
              </div>
            </Link>
            <Link
              href={`/services/${nextService.id}`}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all duration-300 p-5 flex items-center justify-end gap-4 text-right"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Next
                </div>
                <div className="mt-0.5 text-slate-900 text-sm sm:text-base font-bold tracking-tight truncate">
                  {nextService.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-slate-700 transition-all" />
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-14 sm:mt-16 relative rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-12 md:p-14 overflow-hidden text-center">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full opacity-25 blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle, ${service.color}, transparent 70%)` }}
            />
            <div className="relative inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
              <span className="h-px w-6 sm:w-8 bg-slate-300" />
              One conversation
              <span className="h-px w-6 sm:w-8 bg-slate-300" />
            </div>
            <h2 className="relative mt-5 font-extrabold tracking-tight text-slate-900 text-2xl sm:text-3xl md:text-4xl leading-[1.1] max-w-2xl mx-auto">
              Let&apos;s talk about your{" "}
              <span style={{ color: service.color }}>
                {service.title.toLowerCase()}
              </span>{" "}
              project.
            </h2>
            <p className="relative mt-4 text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Tell us where you are, what you need, and when you need it.
              We&apos;ll come back within a business day — with recommended
              engagement model and honest pricing.
            </p>

            <div className="relative mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/schedule"
                className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.25)]"
              >
                Schedule a call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-slate-700 font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                All services
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
