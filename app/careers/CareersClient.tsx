"use client";

import { MouseEvent as ReactMouseEvent, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  MapPin,
  Briefcase,
  Clock,
  Compass,
  Sparkles,
  Eye,
  Zap,
  Globe,
  HeartPulse,
  Wallet,
  BookOpen,
  Plane,
  Calendar,
  Laptop,
  Sun,
  Users,
  TrendingUp,
  Mail,
  Check,
  type LucideIcon,
} from "lucide-react";

/* ───────────────────────── Data ───────────────────────── */

type Role = {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  posted: string;
  featured?: boolean;
};

const DEPARTMENTS = ["All", "Engineering", "Design", "Product", "Operations"] as const;

type Value = { icon: LucideIcon; title: string; desc: string; accent: string };
const VALUES: Value[] = [
  {
    icon: Compass,
    title: "Bias for ownership",
    desc: "Every project has a clear owner who runs it end-to-end — from first conversation to production scale.",
    accent: "#7BB6FF",
  },
  {
    icon: Sparkles,
    title: "Craft over speed",
    desc: "We ship quickly because we ship well. Quality is the prerequisite, not the trade-off.",
    accent: "#A78BFA",
  },
  {
    icon: Eye,
    title: "Default to transparency",
    desc: "Salaries, decisions, mistakes, post-mortems — everything is shared internally. Trust is the foundation.",
    accent: "#34D399",
  },
  {
    icon: Zap,
    title: "Async-first, deep work",
    desc: "Meetings are scarce by design. Writing is how we think. Long focused blocks are non-negotiable.",
    accent: "#FCD34D",
  },
];

type Benefit = { icon: LucideIcon; title: string; desc: string };
const BENEFITS: Benefit[] = [
  { icon: Globe,      title: "Fully remote",         desc: "Work from anywhere. 12 countries, all timezones." },
  { icon: HeartPulse, title: "Premium health",       desc: "Top-tier coverage for you and your dependents." },
  { icon: Wallet,     title: "Meaningful equity",    desc: "Stock options from day one — not just leadership." },
  { icon: BookOpen,   title: "Learning budget",      desc: "$3K annual stipend — courses, books, conferences." },
  { icon: Plane,      title: "Twice-yearly retreats", desc: "The whole team meets in person — somewhere good." },
  { icon: Calendar,   title: "Flexible PTO",          desc: "Unlimited time off with a 25-day annual minimum." },
  { icon: Laptop,     title: "Home office stipend",  desc: "$2K setup + a premium hardware refresh every 3yrs." },
  { icon: Sun,        title: "Paid sabbaticals",     desc: "One paid month off every three years. Recharge." },
];

type Step = { num: string; title: string; desc: string; time: string };
const HIRING_STEPS: Step[] = [
  { num: "01", title: "Application review",  desc: "Every application is read by a human within 5 business days. No black holes.", time: "~5 days" },
  { num: "02", title: "Intro conversation",  desc: "A 30-minute chat with our recruiting team — your story, our story, alignment.", time: "30 min" },
  { num: "03", title: "Craft interview",     desc: "Two live working sessions with future teammates. Real problems, no whiteboard puzzles.", time: "90 min × 2" },
  { num: "04", title: "Team match & offer",  desc: "Meet your team, see the work, ask anything. If we're aligned, we move fast on an offer.", time: "1–2 weeks" },
];

type Stat = { value: string; label: string; icon: LucideIcon };
const STATS: Stat[] = [
  { value: "12",   label: "Open roles",        icon: Briefcase },
  { value: "47",   label: "Engineers",         icon: Users },
  { value: "12",   label: "Countries",         icon: Globe },
  { value: "96%",  label: "Retention",         icon: TrendingUp },
];

/* ───────────────────────── Page ───────────────────────── */

export default function CareersClient({ roles }: { roles: Role[] }) {
  // (children components pull from the `roles` prop)
  return (
    <>
      <Navbar />
      <Hero />
      <ValuesSection />
      <OpenRoles roles={roles} />
      <BenefitsSection />
      <HiringProcess />
      <ClosingCTA />
      <Footer />
    </>
  );
}

/* ───────────────────────── Hero (dark) ───────────────────────── */

function Hero() {
  return (
    <section className="relative w-full bg-[#0C1C3D] overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 lg:pb-28">

      {/* Dot grid */}
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
      {/* Top accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(96,144,255,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
          <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
          Join the team
          <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
        </div>

        {/* Headline */}
        <h1 className="mt-5 text-white font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] max-w-4xl mx-auto">
          Build software that{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            matters
          </span>
          .
        </h1>

        <p className="mt-5 text-blue-100/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          We&apos;re a remote-first studio building the kind of software we&apos;d want
          to use ourselves — with people we&apos;d want to work with for years.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#open-roles"
            className="group inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)]"
          >
            See open roles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#values"
            className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all"
          >
            Read our principles
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-5 sm:py-6 hover:border-blue-400/30 transition-colors duration-500"
              >
                <Icon className="w-4 h-4 text-[#7BB6FF] mx-auto" strokeWidth={1.8} />
                <div className="mt-2 text-white text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1 text-blue-200/55 text-[11px] sm:text-xs font-medium">
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

/* ───────────────────────── Values (white) ───────────────────────── */

function ValuesSection() {
  return (
    <section
      id="values"
      className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28"
    >
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            How we work
          </div>

          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.05]">
            Four{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">principles</span>
            </span>{" "}
            we hire for.
          </h2>

          <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
            These aren&apos;t wall posters. They&apos;re the lens we use for hiring,
            decisions, and how we treat each other every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <article
                key={v.title}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-500 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)`,
                  }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: `${v.accent}18`, color: v.accent }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 text-lg sm:text-xl font-bold tracking-tight">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Open Roles (dark) ───────────────────────── */

function OpenRoles({ roles }: { roles: Role[] }) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState<(typeof DEPARTMENTS)[number]>("All");

  const filtered = useMemo(() => {
    return roles.filter((r) => {
      if (dept !== "All" && r.dept !== dept) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.dept.toLowerCase().includes(q) &&
          !r.location.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, dept, roles]);

  return (
    <section
      id="open-roles"
      className="relative w-full bg-[#0C1C3D] overflow-hidden py-20 sm:py-24 md:py-28"
    >
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

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
              <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
              Open positions
            </div>

            <h2 className="mt-4 text-white font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-4xl md:text-[2.75rem]">
              Find your{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                role
              </span>
              .
            </h2>
          </div>

          {/* Search input */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, team, location…"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-blue-200/40 focus:border-[#7BB6FF]/60 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-[#7BB6FF]/10 transition-all text-sm"
            />
          </div>
        </div>

        {/* Department filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {DEPARTMENTS.map((d) => {
            const isActive = dept === d;
            const count = d === "All" ? roles.length : roles.filter((r) => r.dept === d).length;
            return (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-white text-slate-900 border-white"
                    : "text-blue-100/65 bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                {d}
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-slate-900/10 text-slate-600"
                      : "bg-white/[0.06] text-blue-200/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="mb-5 text-blue-200/50 text-sm">
          Showing <span className="text-white font-semibold">{filtered.length}</span>{" "}
          of <span className="text-white font-semibold">{roles.length}</span> roles
        </div>

        {/* Roles list */}
        {filtered.length > 0 ? (
          <div className="space-y-2.5">
            {filtered.map((r) => (
              <RoleRow key={r.id} role={r} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function RoleRow({ role }: { role: Role }) {
  const subject = encodeURIComponent(`Application: ${role.title}`);
  const body = encodeURIComponent(
    `Hi Igknight team,\n\nI'd like to apply for the ${role.title} role (${role.dept} · ${role.location}).\n\nA short note about me:\n\n— Links: GitHub / portfolio / LinkedIn\n\nThanks,\n`
  );
  return (
    <a
      href={`mailto:careers@igknight.tech?subject=${subject}&body=${body}`}
      className="group block rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      <div className="flex items-center gap-4 p-5 sm:p-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7BB6FF]">
              {role.dept}
            </span>
            {role.featured && (
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] bg-amber-400/15 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-400/25">
                Featured
              </span>
            )}
          </div>

          <h3 className="mt-1.5 text-white text-base sm:text-lg font-bold tracking-tight group-hover:text-white">
            {role.title}
          </h3>

          <div className="mt-2 flex items-center gap-4 sm:gap-5 text-blue-100/55 text-xs sm:text-[13px] flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {role.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {role.posted}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="hidden sm:inline text-blue-100/40 text-xs font-semibold group-hover:text-white transition-colors">
            View role
          </span>
          <span className="w-9 h-9 rounded-full border border-white/15 group-hover:border-white/40 group-hover:bg-white/[0.06] flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4 text-blue-100/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </span>
        </div>
      </div>
    </a>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 sm:p-14 text-center">
      <div className="inline-flex w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 items-center justify-center mb-4">
        <Search className="w-5 h-5 text-blue-200/50" />
      </div>
      <h3 className="text-white text-lg font-bold tracking-tight">
        No roles match your search
      </h3>
      <p className="mt-2 text-blue-100/55 text-sm max-w-md mx-auto leading-relaxed">
        We&apos;re always interested in meeting great people. Send us a note and
        tell us what you&apos;d build with us.
      </p>
      <a
        href="mailto:careers@igknight.tech"
        className="mt-5 inline-flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
      >
        <Mail className="w-4 h-4" />
        Get in touch
      </a>
    </div>
  );
}

/* ───────────────────────── Benefits (white) ───────────────────────── */

function BenefitsSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            Benefits &amp; Perks
          </div>

          <h2 className="mt-4 font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.05]">
            More than just a{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">paycheck</span>
            </span>
            .
          </h2>

          <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
            We invest in our team for the long haul — health, growth, time, and
            the tools to do your best work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center group-hover:bg-blue-100/80 transition-colors">
                  <Icon className="w-5 h-5 text-[#4f9ef8]" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 text-slate-900 text-base font-bold tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-slate-500 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Hiring Process (dark) ───────────────────────── */

function HiringProcess() {
  return (
    <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-20 sm:py-24 md:py-28">
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
            How we hire
          </div>

          <h2 className="mt-4 text-white font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-[3.25rem]">
            A process worth your{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              time
            </span>
            .
          </h2>

          <p className="mt-4 text-blue-100/60 text-base sm:text-lg leading-relaxed">
            Four steps, real conversations, no whiteboard trivia. We respect
            your time as much as we value finding the right fit.
          </p>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[22px] sm:left-[26px] top-2 bottom-2 w-px bg-white/[0.08]" />

          <div className="space-y-6 sm:space-y-7">
            {HIRING_STEPS.map((step, i) => (
              <div key={step.num} className="relative pl-14 sm:pl-16">
                {/* Step badge */}
                <div className="absolute left-0 top-0 w-11 sm:w-[52px] h-11 sm:h-[52px] rounded-full bg-[#0F1F45] border border-white/15 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
                  <span className="text-[#7BB6FF] text-xs sm:text-sm font-black tracking-wider">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-white/[0.05] text-blue-200/60 border border-white/[0.08]">
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </span>
                  </div>
                  <p className="mt-2 text-blue-100/60 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Connection check (after the last completed step visualization) */}
                {i === HIRING_STEPS.length - 1 && (
                  <div className="absolute left-[22px] sm:left-[26px] -bottom-2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400/90 shadow-[0_0_12px_rgba(52,211,153,0.5)] flex items-center justify-center">
                    <Check className="w-2 h-2 text-emerald-950" strokeWidth={3.5} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Closing CTA (white) ───────────────────────── */

function ClosingCTA() {
  const trackMouse = (e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28">
      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        <div
          onMouseMove={trackMouse}
          className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-12 md:p-14 overflow-hidden text-center"
        >
          {/* Mouse-tracked spotlight */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background:
                "radial-gradient(400px circle at var(--mx) var(--my), rgba(123,182,255,0.10), transparent 60%)",
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase mb-5">
              <span className="h-px w-6 sm:w-8 bg-slate-300" />
              Don&apos;t see your role?
              <span className="h-px w-6 sm:w-8 bg-slate-300" />
            </div>

            <h2 className="font-extrabold tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-[1.1] max-w-3xl mx-auto">
              We&apos;re always meeting{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 bg-amber-300/85 rounded-[3px]"
                />
                <span className="relative">great people</span>
              </span>
              .
            </h2>

            <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              If you don&apos;t see a role that fits, drop us a note anyway. Tell us
              what you&apos;d build, and we&apos;ll keep you in mind for what&apos;s next.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:careers@igknight.tech"
                className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl transition-all shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.25)]"
              >
                <Mail className="w-4 h-4" />
                careers@igknight.tech
              </a>
              <Link
                href="/schedule"
                className="group inline-flex items-center gap-2 text-slate-700 font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Schedule a chat
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
