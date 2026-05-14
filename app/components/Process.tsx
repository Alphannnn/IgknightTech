"use client";

import { Search, Pencil, Code2, Rocket, type LucideIcon } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

type Step = {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  deliverables: string[];
  duration: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    icon: Search,
    title: "Discover & Strategy",
    desc: "We start by understanding your goals, users, and constraints — then map the path forward with clarity.",
    deliverables: ["Product strategy", "Technical audit", "Roadmap"],
    duration: "Week 1 – 2",
  },
  {
    num: "02",
    icon: Pencil,
    title: "Design & Architecture",
    desc: "Beautiful interfaces and robust system architecture, designed together as one fabric.",
    deliverables: ["UI/UX design", "Design system", "Architecture docs"],
    duration: "Week 2 – 4",
  },
  {
    num: "03",
    icon: Code2,
    title: "Build & Iterate",
    desc: "Production-grade engineering with weekly demos, continuous integration, and zero surprises.",
    deliverables: ["Production code", "Quality assurance", "Weekly demos"],
    duration: "Week 4 – 12",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Launch & Scale",
    desc: "We don't just ship — we monitor, optimize, and grow with you for the long haul.",
    deliverables: ["Launch ops", "Monitoring", "Continuous evolution"],
    duration: "Ongoing",
  },
];

export default function Process() {
  const [headerRef, headerVisible] = useReveal<HTMLElement>();

  return (
    <section
      id="process"
      className="relative w-full bg-white overflow-hidden py-24 sm:py-28 md:py-32 lg:py-36 scroll-mt-20"
    >

      {/* Hairline grid — engineering blueprint feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 45%, #000 35%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* ── Editorial header — left-aligned, monospace label */}
        <header
          ref={headerRef}
          className={`reveal reveal-up flex flex-col gap-6 sm:gap-7 max-w-3xl mb-16 sm:mb-20 lg:mb-24 ${headerVisible ? "reveal-in" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-[#2783ED]"
            >
              04 / PROCESS
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-slate-300 to-transparent"
            />
          </div>

          <h2 className="text-slate-900 tracking-[-0.02em] leading-[0.98] text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem]">
            <span className="font-light text-slate-400">From idea</span>
            <br />
            <span className="font-semibold">to production.</span>
          </h2>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
            A proven four-stage process — clear milestones, weekly demos, and no
            surprises. This is how we ship.
          </p>
        </header>

        {/* ── Editorial timeline */}
        <ol className="relative">
          {/* Vertical guide rail */}
          <div
            aria-hidden="true"
            className="absolute left-[0px] sm:left-[2px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"
          />

          {STEPS.map((step, idx) => (
            <PhaseRow
              key={step.num}
              step={step}
              isLast={idx === STEPS.length - 1}
              order={idx}
            />
          ))}
        </ol>

      </div>
    </section>
  );
}

/* ── Single timeline phase — stagger-revealed on scroll ── */
function PhaseRow({
  step,
  isLast,
  order,
}: {
  step: Step;
  isLast: boolean;
  order: number;
}) {
  const Icon = step.icon;
  const [rowRef, visible] = useReveal<HTMLLIElement>();

  return (
    <li
      ref={rowRef}
      className={`reveal reveal-up group relative pl-8 sm:pl-12 md:pl-16 ${
        isLast ? "" : "pb-14 sm:pb-16 md:pb-20"
      } ${visible ? "reveal-in" : ""}`}
      style={{ transitionDelay: visible ? `${order * 110}ms` : "0ms" }}
    >
      {/* Step marker — a precise hairline tick on the rail */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-[18px] w-[14px] h-[14px] rounded-full bg-white border transition-all duration-700 flex items-center justify-center ${
          visible ? "border-[#2783ED]/60 scale-100" : "border-slate-300 scale-75"
        } group-hover:border-[#2783ED]`}
        style={{ transitionDelay: visible ? `${order * 110 + 220}ms` : "0ms" }}
      >
        <span
          className={`w-[5px] h-[5px] rounded-full transition-colors duration-700 ${
            visible ? "bg-[#2783ED]" : "bg-slate-300"
          }`}
          style={{ transitionDelay: visible ? `${order * 110 + 280}ms` : "0ms" }}
        />
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr_auto] gap-y-5 lg:gap-x-10 items-start">

        {/* HUGE numeral — editorial anchor */}
        <div className="flex items-start gap-4 lg:flex-col lg:gap-2.5">
          <span
            className="font-mono text-[3.4rem] sm:text-[4.2rem] md:text-[5rem] leading-[0.85] font-light tracking-[-0.04em] text-slate-900 group-hover:text-[#1A6FD9] transition-colors duration-500"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {step.num}
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-slate-400 uppercase pt-3 lg:pt-0">
            {step.duration}
          </span>
        </div>

        {/* Body */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Icon
              className="w-4 h-4 text-slate-400 group-hover:text-[#2783ED] transition-colors duration-500"
              strokeWidth={1.5}
            />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              Phase
            </span>
          </div>

          <h3 className="mt-2.5 text-slate-900 text-[1.6rem] sm:text-[1.85rem] md:text-[2rem] font-medium tracking-[-0.015em] leading-[1.1]">
            {step.title}
          </h3>
          <p className="mt-3 text-slate-500 text-[15px] sm:text-base leading-relaxed max-w-xl">
            {step.desc}
          </p>
        </div>

        {/* Deliverables */}
        <div className="lg:min-w-[200px] lg:pt-1">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-3">
            Deliverables
          </div>
          <ul className="space-y-2">
            {step.deliverables.map((d) => (
              <li
                key={d}
                className="flex items-baseline gap-3 text-slate-700 text-[14px] transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <span className="font-mono text-[10px] text-[#2783ED] tabular-nums">
                  →
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
