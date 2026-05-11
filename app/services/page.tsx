"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SERVICES, type Service } from "./services-data";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ───────────────────────── Page ───────────────────────── */

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Bento />
      <FinalCTA />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero (light) ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20">

      {/* Soft mesh gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-[12%] w-[520px] h-[520px] rounded-full opacity-[0.22] blur-3xl"
          style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
        />
        <div
          className="absolute top-[18%] right-[8%] w-[460px] h-[460px] rounded-full opacity-[0.20] blur-3xl"
          style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 left-[40%] w-[420px] h-[420px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: "radial-gradient(circle, #34D399, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">

        <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
          What we do
          <span className="h-px w-6 sm:w-8 bg-slate-300" />
        </div>

        <h1 className="mt-5 text-slate-900 font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] max-w-4xl mx-auto">
          Software services that{" "}
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
            />
            <span className="relative">ship</span>
          </span>
          .
        </h1>

        <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Engineering, design, and infrastructure — delivered by senior teams
          who&apos;ve shipped at scale.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/schedule"
            className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.28)]"
          >
            Start a project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-slate-700 font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-white transition-all"
          >
            See our work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Bento (white) ───────────────────────── */

function Bento() {
  const featured = SERVICES[0]; // Custom Software — big card
  const wide = SERVICES.find((s) => s.id === "ai-data")!; // AI & Data — wide accent card
  const small = SERVICES.filter((s) => s.id !== featured.id && s.id !== wide.id);

  return (
    <section className="relative w-full bg-white pb-20 sm:pb-24 md:pb-28">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* Featured big card */}
          <FeaturedCard service={featured} />

          {/* Top-right two small cards (stack vertically alongside featured) */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <SmallCard service={small[0]} delay={60} />
            <SmallCard service={small[1]} delay={120} />
          </div>

          {/* Wide accent card spanning 2 columns */}
          <WideAccentCard service={wide} />

          {/* Two more small cards in remaining slot */}
          <SmallCard service={small[2]} delay={240} />

          {/* Final small card spanning normal width */}
          <SmallCard service={small[3]} delay={300} extraClass="lg:col-span-1" />
        </div>
      </div>
    </section>
  );
}

/* ── Featured (big bento card with accent gradient) ── */
function FeaturedCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.id}`}
      className="group relative lg:col-span-2 lg:row-span-2 rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-all duration-500 p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[420px]"
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 60% at 100% 0%, ${service.color}1A 0%, transparent 60%)`,
      }}
    >
      {/* Decorative blob */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: `radial-gradient(circle, ${service.color}, transparent 70%)` }}
      />

      {/* Top: icon + tag */}
      <div className="relative flex items-start justify-between">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
          style={{ background: `linear-gradient(135deg, ${service.color}15, white)` }}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: service.color }} strokeWidth={1.7} />
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Featured · {service.navTag}
        </div>
      </div>

      {/* Middle: title + tagline */}
      <div className="relative mt-6 sm:mt-8">
        <h3 className="text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05]">
          {service.title}
        </h3>
        <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
          {service.description}
        </p>

        {/* Capability chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {service.capabilities.slice(0, 4).map((c) => (
            <span
              key={c.title}
              className="text-xs font-semibold tracking-tight px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700"
            >
              {c.title}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom: stat + arrow */}
      <div className="relative mt-8 pt-6 border-t border-slate-100 flex items-end justify-between gap-4">
        <div>
          <div
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: service.color }}
          >
            {service.stat.value}
          </div>
          <div className="mt-1 text-slate-500 text-xs uppercase tracking-wide font-semibold">
            {service.stat.label}
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-slate-900 group-hover:text-slate-700 text-sm font-bold transition-colors">
          Explore
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

/* ── Wide accent card (2-col span, dark accent treatment) ── */
function WideAccentCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.id}`}
      className="group relative lg:col-span-2 rounded-3xl border overflow-hidden hover:scale-[1.005] transition-all duration-500 p-6 sm:p-8"
      style={{
        background: `linear-gradient(135deg, #0F1F45, #0C1C3D)`,
        borderColor: `${service.color}40`,
      }}
    >
      {/* Accent glow */}
      <div
        className="absolute -top-20 -right-10 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${service.color}, transparent 70%)` }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border"
          style={{
            background: `${service.color}20`,
            borderColor: `${service.color}40`,
          }}
        >
          <Icon className="w-7 h-7" style={{ color: service.color }} strokeWidth={1.7} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200/65">
            {service.navTag}
          </div>
          <h3 className="mt-1 text-white text-2xl sm:text-3xl font-extrabold tracking-tight">
            {service.title}
          </h3>
          <p className="mt-2 text-blue-100/65 text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center gap-4 sm:flex-col sm:items-end">
          <div className="text-right">
            <div
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: service.color }}
            >
              {service.stat.value}
            </div>
            <div className="mt-0.5 text-blue-200/55 text-[10px] uppercase tracking-wide font-semibold">
              {service.stat.label}
            </div>
          </div>
          <span className="w-10 h-10 rounded-full border border-white/15 group-hover:border-white/40 group-hover:bg-white/[0.06] flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Small card (1x1) ── */
function SmallCard({
  service,
  delay,
  extraClass,
}: {
  service: Service;
  delay: number;
  extraClass?: string;
}) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.id}`}
      className={`group relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[200px] ${extraClass ?? ""}`}
      style={{
        animation: `fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className="absolute -top-px -right-px w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${service.color}1F, transparent 65%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center border border-slate-200"
            style={{ background: `${service.color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color: service.color }} strokeWidth={1.8} />
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          {service.navTag}
        </div>
        <h3 className="mt-1 text-slate-900 text-lg sm:text-xl font-extrabold tracking-tight">
          {service.title}
        </h3>
        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
          {service.tagline}
        </p>
      </div>
    </Link>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */

function FinalCTA() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #0F1F45 0%, #0C1C3D 100%)",
          }}
        >
          {/* Top glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,182,255,0.20) 0%, transparent 70%)",
            }}
          />

          <h2 className="relative text-white font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto">
            Tell us what you&apos;re{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #7BB6FF, #BFD9FF, #7BB6FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              building
            </span>
            .
          </h2>
          <p className="relative mt-5 text-blue-100/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            One conversation. First thoughts, honest pricing, next steps —
            within a business day.
          </p>

          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.4)] hover:shadow-[0_0_32px_rgba(79,158,248,0.6)]"
            >
              Schedule a call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:hello@igknight.tech"
              className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all"
            >
              Email instead
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
