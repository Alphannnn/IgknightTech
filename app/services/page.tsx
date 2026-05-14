"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SERVICES, type Service } from "./services-data";
import { CASES } from "../work/cases";
import { ServicePreview } from "./ServicePreview";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Users,
  Infinity as InfinityIcon,
  Check,
  type LucideIcon,
} from "lucide-react";

/* ───────────────────────── Page ───────────────────────── */

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <DisciplinesShowcase />
      <EngagementModels />
      <Principles />
      <FinalCTA />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24">

      {/* Soft mesh gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-[12%] w-[560px] h-[560px] rounded-full opacity-[0.22] blur-3xl"
          style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
        />
        <div
          className="absolute top-[18%] right-[8%] w-[500px] h-[500px] rounded-full opacity-[0.20] blur-3xl"
          style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 left-[40%] w-[460px] h-[460px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: "radial-gradient(circle, #34D399, transparent 70%)" }}
        />
      </div>

      {/* Faint grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 60%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 60%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
              <span className="h-px w-6 sm:w-8 bg-slate-300" />
              Services · Six disciplines
            </div>

            <h1 className="mt-5 text-slate-900 font-extrabold tracking-tight leading-[1.02] text-[2.5rem] sm:text-6xl md:text-[4.5rem] lg:text-[5rem]">
              Built like it{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-1 sm:bottom-2 md:bottom-3 h-2.5 sm:h-3 md:h-[16px] bg-amber-300/85 rounded-[3px]"
                />
                <span className="relative">matters</span>
              </span>
              .
            </h1>

            <p className="mt-6 text-slate-600 text-base sm:text-lg lg:text-[1.2rem] max-w-xl leading-relaxed">
              Six disciplines. One senior studio. We design, build, and look
              after the software your business runs on — at the bar your
              engineers respect, with the warmth your team will want to work
              with.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
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

          {/* Right rail: editorial micro-stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md lg:max-w-none lg:justify-self-end lg:w-full lg:max-w-[420px]">
            <HeroStat value="50+" label="Products shipped" />
            <HeroStat value="$2.4B+" label="Revenue impact" />
            <HeroStat value="12" label="Countries served" />
            <HeroStat value="96%" label="On-time delivery" />
          </div>
        </div>

        {/* Currently shipping for · marquee */}
        <div className="mt-16 sm:mt-20">
          <div className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] mb-5">
            Currently shipping for
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="flex gap-10 sm:gap-14 w-max"
              style={{ animation: "marquee-left 38s linear infinite" }}
            >
              {[...CASES, ...CASES].map((c, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 text-slate-400 text-xl sm:text-2xl font-extrabold tracking-tight select-none"
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

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 hover:border-slate-300 transition-all">
      <div className="text-slate-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
        {value}
      </div>
      <div className="mt-1.5 text-slate-600 text-xs sm:text-[13px] font-medium">
        {label}
      </div>
    </div>
  );
}

/* ───────────────────────── Disciplines showcase (white, premium feature cards) ───────────────────────── */

function DisciplinesShowcase() {
  return (
    <section className="relative w-full bg-white pb-20 sm:pb-24 md:pb-28">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            What we do
          </div>
          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-[3rem] leading-[1.05]">
            Six things we&apos;ve done{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">a hundred times</span>
            </span>
            .
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Most projects need more than one of these. We build the right shape
            for the work — and tell you which pieces you actually need on the
            first call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {SERVICES.map((s, i) => (
            <ServiceFeatureCard key={s.id} service={s} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceFeatureCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group relative rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 hover:shadow-[0_20px_50px_-22px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 transition-all duration-500 flex flex-col"
    >
      {/* Top accent line on hover */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
        }}
      />

      {/* Visual preview area */}
      <div className="relative aspect-[16/10] border-b border-slate-200/70">
        <ServicePreview service={service} rounded="rounded-none" />

        {/* Number + nav tag chip overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="font-mono text-[11px] font-bold tabular-nums text-slate-900 px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: `1px solid ${service.color}55`,
            }}
          >
            <span aria-hidden="true" style={{ color: service.color }}>·</span> {String(index).padStart(2, "0")}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(15,23,42,0.1)",
            }}
          >
            {service.navTag}
          </span>
        </div>

        {/* Outcome chip — bottom right, the human-friendly promise */}
        <div className="absolute bottom-4 right-4">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-900 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
            style={{
              background: "rgba(255,255,255,0.96)",
              border: `1px solid ${service.color}55`,
            }}
          >
            <Clock
              className="w-3 h-3"
              style={{ color: service.color }}
              strokeWidth={2.4}
            />
            First outcomes in {service.outcomes.timeframe}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 sm:p-7 lg:p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-5 w-[3px] rounded-full"
            style={{ background: service.color }}
          />
          <h3 className="text-slate-900 text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight leading-[1.1]">
            {service.title}
          </h3>
        </div>
        <p className="mt-3 text-slate-800 text-base sm:text-[17px] font-semibold leading-snug">
          {service.tagline}
        </p>
        <p className="mt-3 text-slate-600 text-sm sm:text-[15px] leading-relaxed flex-1">
          {service.description}
        </p>

        {/* Capability bullets */}
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
          {service.capabilities.slice(0, 4).map((c) => (
            <li
              key={c.title}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <Check
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: service.color }}
                strokeWidth={2.4}
              />
              <span className="truncate">{c.title}</span>
            </li>
          ))}
        </ul>

        {/* Footer: stat + CTA */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-end justify-between gap-4">
          <div>
            <div
              className="text-2xl sm:text-[1.75rem] font-extrabold tracking-tight"
              style={{ color: service.color }}
            >
              {service.stat.value}
            </div>
            <div className="mt-0.5 text-slate-500 text-[10px] uppercase tracking-wide font-bold">
              {service.stat.label}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-slate-900 group-hover:text-slate-700 text-sm font-bold transition-colors">
            Explore
            <span className="w-9 h-9 rounded-full border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ───────────────────────── Engagement models (dark, warmer copy) ───────────────────────── */

type EngagementModel = {
  id: string;
  icon: LucideIcon;
  name: string;
  duration: string;
  pitch: string;
  best: string[];
  color: string;
};

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "sprint",
    icon: Clock,
    name: "Project sprint",
    duration: "4 – 12 weeks",
    pitch:
      "When you know what you want and need it shipped. An audit, a launch, a migration — work with a clear start, clear end, and a price you sign up to before kickoff.",
    best: ["Audits", "MVP builds", "Migrations", "Re-platforms"],
    color: "#7BB6FF",
  },
  {
    id: "squad",
    icon: Users,
    name: "Full squad",
    duration: "3 – 9 months",
    pitch:
      "When you need a senior team to join yours for a quarter or two. Co-located in your Slack, shipping on your repo, accountable to your roadmap — your team's velocity, plus ours.",
    best: ["Product builds", "Platform rebuilds", "ML platforms", "Mobile rewrites"],
    color: "#A78BFA",
  },
  {
    id: "embed",
    icon: InfinityIcon,
    name: "Ongoing partner",
    duration: "Continuous",
    pitch:
      "When you want a long-term partner that becomes part of how you ship. We embed, we own, we operate — with structured handoff baked in so you're never stuck.",
    best: ["Scale-out", "Platform ownership", "Long-term operate", "Always-on SRE"],
    color: "#34D399",
  },
];

function EngagementModels() {
  return (
    <section className="relative w-full bg-[#143A8E] overflow-hidden py-20 sm:py-24 md:py-28">

      {/* Dot grid */}
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

        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
            How we work together
          </div>
          <h2 className="mt-4 text-white font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-4xl md:text-[3rem]">
            Three shapes a{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #7BB6FF 0%, #CDE2FE 60%, #7BB6FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              partnership
            </span>{" "}
            can take.
          </h2>
          <p className="mt-4 text-blue-100/60 text-base sm:text-lg leading-relaxed max-w-2xl">
            Not every problem needs a year-long build, and not every team needs
            an agency for the long haul. We&apos;ll tell you which of these
            actually fits — on the first call, without a sales script.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {ENGAGEMENT_MODELS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden p-6 sm:p-7 flex flex-col"
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute -top-px -right-px w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${m.color}28, transparent 65%)`,
                  }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.08]"
                    style={{ background: `${m.color}1F` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: m.color }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                    style={{
                      background: `${m.color}14`,
                      color: m.color,
                    }}
                  >
                    {m.duration}
                  </span>
                </div>

                <h3 className="mt-6 text-white text-2xl sm:text-[1.6rem] font-extrabold tracking-tight">
                  {m.name}
                </h3>
                <p className="mt-3 text-blue-100/65 text-sm sm:text-[15px] leading-relaxed flex-1">
                  {m.pitch}
                </p>

                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200/50">
                    Best for
                  </div>
                  <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5">
                    {m.best.map((b) => (
                      <li
                        key={b}
                        className="inline-flex items-center gap-1.5 text-sm text-blue-100/80"
                      >
                        <span
                          aria-hidden="true"
                          className="w-1 h-1 rounded-full"
                          style={{ background: m.color }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-blue-100/55 text-sm sm:text-[15px] leading-relaxed max-w-2xl">
          Not sure which fits? Bring us the problem and we&apos;ll recommend the
          shape — even if the honest answer is &ldquo;you don&apos;t need an
          agency for this.&rdquo;
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Principles (off-white, editorial) ───────────────────────── */

const PRINCIPLES: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Boring tech where it works. Novel tech where it matters.",
    body: "We optimize for the systems your team can maintain after we leave — not the demo that looks impressive on a conference stage.",
  },
  {
    num: "02",
    title: "Outcomes over outputs.",
    body: "We don't bill by the artifact. We measure by what changes for your users, your engineers, and your business after we ship.",
  },
  {
    num: "03",
    title: "Senior teams or none at all.",
    body: "The people you meet on the first call are the people writing the code on the last day. No bait-and-switch after signing.",
  },
  {
    num: "04",
    title: "Your team should be stronger when we leave.",
    body: "Documentation, runbooks, pair-programming — knowledge transfer is built into every engagement, so we never become hostage architecture.",
  },
];

function Principles() {
  return (
    <section className="relative w-full bg-[#FAFAF8] overflow-hidden py-20 sm:py-24 md:py-28 border-t border-slate-200/70">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
              <span className="h-px w-6 sm:w-8 bg-slate-300" />
              How we choose
            </div>
            <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-[3rem] leading-[1.05]">
              Four lines we{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
                />
                <span className="relative">won&apos;t cross</span>
              </span>
              .
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-md">
              These guide which projects we take, how we estimate them, and
              when we tell you we&apos;re not the right team for the work.
            </p>
          </div>

          <ol className="space-y-0">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.num}
                className={`grid grid-cols-[44px_1fr] gap-5 sm:gap-7 py-6 sm:py-7 ${
                  i !== PRINCIPLES.length - 1 ? "border-b border-slate-200/70" : ""
                }`}
              >
                <span className="font-mono text-slate-400 text-[13px] sm:text-sm font-semibold tabular-nums tracking-tight pt-1">
                  {p.num}
                </span>
                <div>
                  <h3 className="text-slate-900 text-lg sm:text-xl md:text-[1.35rem] font-extrabold tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
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
            background: "linear-gradient(135deg, #1B49A8 0%, #143A8E 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(123,182,255,0.20) 0%, transparent 70%)",
            }}
          />

          <div className="relative inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
            One conversation
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
          </div>

          <h2 className="relative mt-5 text-white font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto">
            Tell us what you&apos;re{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #7BB6FF, #CDE2FE, #7BB6FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              building
            </span>
            .
          </h2>
          <p className="relative mt-5 text-blue-100/65 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            First thoughts, honest pricing, the engagement model we&apos;d
            recommend — within a business day. No follow-up sequence, no SDR
            queue.
          </p>

          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2 bg-[#2783ED] hover:bg-[#1A6FD9] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(39,131,237,0.4)] hover:shadow-[0_0_32px_rgba(39,131,237,0.6)]"
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
