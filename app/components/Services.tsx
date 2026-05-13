"use client";

import Link from "next/link";
import { MouseEvent as ReactMouseEvent, CSSProperties } from "react";
import {
  Code2,
  Globe,
  Smartphone,
  Sparkles,
  Cloud,
  Palette,
  ArrowUpRight,
} from "lucide-react";

type Service = {
  id: string;
  icon: typeof Code2;
  title: string;
  desc: string;
  meta: string;
  accent: string;
};

const SERVICES: Service[] = [
  {
    id: "custom-software",
    icon: Code2,
    title: "Custom Software",
    desc: "Bespoke products engineered around your exact business workflow — from MVP to enterprise scale.",
    meta: "Architecture · Backend · Integrations",
    accent: "#7BB6FF",
  },
  {
    id: "web-development",
    icon: Globe,
    title: "Web Development",
    desc: "Modern, performant web experiences built on a battle-tested stack.",
    meta: "Next.js · TypeScript · Edge",
    accent: "#A78BFA",
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native iOS, Android, and cross-platform builds that feel right at home on every device.",
    meta: "iOS · Android · React Native",
    accent: "#34D399",
  },
  {
    id: "ai-data",
    icon: Sparkles,
    title: "AI & Data",
    desc: "From data pipelines to LLM-powered features — practical intelligence, shipped to production.",
    meta: "ML Ops · RAG · Analytics",
    accent: "#FCD34D",
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Resilient infrastructure, automated pipelines, and zero-downtime deployments — at any scale.",
    meta: "AWS · GCP · Kubernetes",
    accent: "#60A5FA",
  },
  {
    id: "product-design",
    icon: Palette,
    title: "Product Design",
    desc: "Human-centered UI/UX backed by research, prototyping, and iteration with your users.",
    meta: "Research · UI · Design Systems",
    accent: "#F472B6",
  },
];

/* Bento sizing: WIDE, NARROW, NARROW, WIDE, WIDE, NARROW */
const WIDE_INDICES = new Set([0, 3, 4]);

export default function Services() {
  const trackMouse = (e: ReactMouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-24 sm:py-28 md:py-32">

      {/* Grid line pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 50%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />

      {/* Top accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(96,144,255,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
            What We Do
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
          </div>

          <h2 className="mt-5 text-white font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Engineered to{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ship
            </span>
          </h2>

          <p className="mt-5 text-blue-100/60 text-base sm:text-lg leading-relaxed">
            End-to-end software services — from product strategy to scaling in
            production. One partner, every stage of the build.
          </p>
        </div>

        {/* Bento services grid */}
        <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const wide = WIDE_INDICES.has(i);

            return (
              <Link
                key={s.title}
                href={`/services/${s.id}`}
                onMouseMove={trackMouse}
                className={`group relative block rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-7 md:p-8 hover:border-white/25 hover:-translate-y-0.5 transition-all duration-500 overflow-hidden ${
                  wide ? "lg:col-span-2" : "lg:col-span-1"
                }`}
                style={{ "--accent": s.accent } as CSSProperties}
              >
                {/* Mouse-tracked spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(320px circle at var(--mx) var(--my), ${s.accent}22, transparent 60%)`,
                  }}
                />

                {/* Corner gradient bloom on hover */}
                <div
                  className="absolute -top-px -right-px w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${s.accent}28, transparent 65%)`,
                  }}
                />

                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                  }}
                />

                <div className="relative flex flex-col h-full">

                  {/* Top row: icon + arrow */}
                  <div className="flex items-start justify-between">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${s.accent}35, transparent 70%)`,
                        }}
                      />
                      <Icon
                        className="relative w-6 h-6 sm:w-7 sm:h-7"
                        style={{ color: s.accent }}
                        strokeWidth={1.7}
                      />
                    </div>

                    <ArrowUpRight
                      className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 sm:mt-7 text-white text-xl sm:text-2xl font-bold tracking-tight">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 sm:mt-3 text-blue-100/55 text-sm sm:text-[15px] leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Meta / stack chips */}
                  <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.06]">
                    <span className="text-[11px] sm:text-xs font-medium tracking-wide text-white/40 group-hover:text-white/70 transition-colors duration-300">
                      {s.meta}
                    </span>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <p className="text-blue-100/60 text-sm sm:text-base">
            Want to dive deeper into any of these?
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-white font-semibold text-sm sm:text-[15px] px-6 py-3 rounded-lg border border-white/15 hover:border-white/35 hover:bg-white/[0.05] transition-all duration-300"
          >
            See all services
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
