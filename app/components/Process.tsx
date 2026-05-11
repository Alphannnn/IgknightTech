"use client";

import { Search, Pencil, Code2, Rocket, type LucideIcon } from "lucide-react";

type Step = {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  deliverables: string[];
};

const STEPS: Step[] = [
  {
    num: "01",
    icon: Search,
    title: "Discover & Strategy",
    desc: "We start by understanding your goals, users, and constraints — then map the path forward.",
    deliverables: ["Product strategy", "Technical audit", "Roadmap"],
  },
  {
    num: "02",
    icon: Pencil,
    title: "Design & Architecture",
    desc: "Beautiful interfaces and robust system architecture, designed together as one fabric.",
    deliverables: ["UI/UX design", "Design system", "Architecture docs"],
  },
  {
    num: "03",
    icon: Code2,
    title: "Build & Iterate",
    desc: "Production-grade engineering with weekly demos, continuous integration, and zero surprises.",
    deliverables: ["Production code", "Quality assurance", "Weekly demos"],
  },
  {
    num: "04",
    icon: Rocket,
    title: "Launch & Scale",
    desc: "We don't just ship — we monitor, optimize, and grow with you for the long haul.",
    deliverables: ["Launch ops", "Monitoring", "Continuous evolution"],
  },
];

export default function Process() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">

      {/* Subtle background grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        {/* Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            How We Work
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
          </div>

          <h2 className="mt-5 font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05]">
            From idea to{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">production</span>
            </span>
          </h2>

          <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed">
            A proven four-stage process — clear milestones, weekly demos, and no
            surprises. This is how we ship.
          </p>
        </div>

        {/* Process grid */}
        <div className="relative">

          {/* Desktop connecting line (between cards, horizontal) */}
          <div className="hidden lg:block absolute top-[88px] left-[6%] right-[6%] h-px pointer-events-none">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(203,213,225) 50%, transparent 50%)",
                backgroundSize: "10px 1px",
              }}
            />
            {/* Traveling dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #7BB6FF 0%, #4f9ef8 100%)",
                boxShadow:
                  "0 0 0 4px rgba(79,158,248,0.18), 0 0 16px rgba(79,158,248,0.55)",
                animation: "process-dot 7s linear infinite",
              }}
            />
          </div>

          {/* Mobile/tablet connecting line (vertical between cards) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[34px] w-px pointer-events-none">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgb(203,213,225) 50%, transparent 50%)",
                backgroundSize: "1px 10px",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-4">
            {STEPS.map((step) => (
              <ProcessCard key={step.num} step={step} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Single process card ── */
function ProcessCard({ step }: { step: Step }) {
  const Icon = step.icon;

  return (
    <article className="group relative">

      {/* Step number badge (sits on the connecting line) */}
      <div className="relative z-10 flex justify-center lg:justify-start mb-5 sm:mb-6">
        <div className="relative w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-[#7BB6FF]/70 transition-colors duration-500 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
          {/* Inner accent ring */}
          <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
            <Icon
              className="w-6 h-6 text-[#4f9ef8] group-hover:scale-110 transition-transform duration-300"
              strokeWidth={1.8}
            />
          </div>
          {/* Step number floating chip */}
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center tracking-wider shadow-[0_4px_12px_rgba(15,23,42,0.25)]">
            {step.num}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-slate-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-500 overflow-hidden">

        {/* Top accent line on hover */}
        <div
          className="absolute top-0 left-5 right-5 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
          style={{
            background:
              "linear-gradient(90deg, transparent, #4f9ef8, transparent)",
          }}
        />

        {/* Big watermark step number (background decoration) */}
        <div
          className="absolute -top-3 -right-2 text-[5.5rem] sm:text-[6rem] font-black select-none pointer-events-none leading-none"
          style={{ color: "#DBEAFE" }}
          aria-hidden="true"
        >
          {step.num}
        </div>

        <div className="relative">
          <h3 className="text-slate-900 text-lg sm:text-xl font-bold tracking-tight">
            {step.title}
          </h3>
          <p className="mt-2 text-slate-500 text-sm leading-relaxed">
            {step.desc}
          </p>

          <ul className="mt-5 pt-5 border-t border-slate-100 space-y-2">
            {step.deliverables.map((d) => (
              <li
                key={d}
                className="flex items-center gap-2.5 text-slate-600 text-[13px]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#4f9ef8] flex-shrink-0 group-hover:bg-[#3a8ef0] transition-colors"
                  style={{ boxShadow: "0 0 0 3px rgba(79,158,248,0.15)" }}
                />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
