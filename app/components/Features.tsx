"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Features() {
  return (
    <>
      <ProjectManagementSection />
      <WorkTogetherSection />
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Section 1 — Project Management (text left, mockup right)   */
/* ─────────────────────────────────────────────────────────── */
export function ProjectManagementSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 scroll-mt-20"
    >
      {/* Decorative topographic lines — bottom left */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 sm:-left-6 -bottom-6 sm:bottom-8 w-[280px] sm:w-[340px] md:w-[400px] text-slate-200"
        viewBox="0 0 400 400"
        fill="none"
      >
        {Array.from({ length: 9 }).map((_, i) => {
          const rx = 28 + i * 20;
          const ry = 20 + i * 15;
          return (
            <ellipse
              key={i}
              cx="200"
              cy="200"
              rx={rx}
              ry={ry}
              transform="rotate(-22 200 200)"
              stroke="currentColor"
              strokeWidth="0.9"
              fill="none"
            />
          );
        })}
      </svg>

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-12 lg:gap-10 items-center">

        {/* Left — Text */}
        <div className="flex flex-col gap-6 sm:gap-7 text-center lg:text-left items-center lg:items-start lg:-ml-6">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            Built for shipping
          </div>

          <h2 className="font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05]">
            <span className="block">Project</span>
            <span className="relative inline-block mt-1">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">Management</span>
            </span>
          </h2>

          <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed max-w-[460px]">
            Real timelines, real status, real visibility. From kickoff to launch,
            you see what we&apos;re building, who&apos;s on it, and what ships next —
            no opaque agency black boxes.
          </p>

          <div className="mt-1">
            <Link
              href="/#process"
              className="group inline-flex items-center gap-2.5 bg-[#4a8fd8] hover:bg-[#3a7fcb] text-white text-sm sm:text-[15px] font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-white/10 shadow-[0_10px_30px_-6px_rgba(74,144,217,0.45)] hover:shadow-[0_16px_40px_-6px_rgba(74,144,217,0.6)] transition-all duration-300"
            >
              See how we ship
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Right — Project board mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <ProjectBoardMockup />
        </div>
      </div>
    </section>
  );
}

/* ── Video showcase (cinematic, premium) ── */
/* Drop your file at /public/project-demo.mp4 (and optionally a poster at
   /public/project-demo-poster.jpg) — or change the paths below. */
const VIDEO_SRC    = "/project.mp4";
const VIDEO_POSTER = "/project-demo-poster.jpg";

function ProjectBoardMockup() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause based on viewport visibility — "moving image" effect on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => { /* autoplay can be blocked; ignore */ });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[620px] aspect-[16/10]">

      {/* Ambient halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-[3rem] blur-3xl opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 55% 45%, rgba(123,182,255,0.22), transparent 70%)",
        }}
      />

      {/* Clean video frame — no overlays, behaves like a moving image */}
      <div className="absolute inset-0 rounded-2xl border border-slate-200 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.3)] overflow-hidden bg-gradient-to-br from-[#0C1C3D] via-[#0F1F45] to-[#0C1C3D]">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Section 2 — Work Together (orbital avatars left, text right) */
/* ─────────────────────────────────────────────────────────── */

const AVATARS: { x: number; y: number; from: string; to: string; initials: string }[] = [
  { x: -33, y: -40, from: "#FCD34D", to: "#F59E0B", initials: "JW" }, // top-left  · yellow
  { x:  -2, y: -32, from: "#34D399", to: "#10B981", initials: "PK" }, // top       · green (inner)
  { x:  32, y: -38, from: "#93C5FD", to: "#3B82F6", initials: "SC" }, // top-right · blue
  { x: -45, y:  -2, from: "#FCA5A5", to: "#EF4444", initials: "HT" }, // left      · red
  { x: -22, y:   6, from: "#93C5FD", to: "#2563EB", initials: "DP" }, // mid-left  · blue (inner)
  { x:  22, y:   6, from: "#5EEAD4", to: "#0D9488", initials: "MG" }, // mid-right · teal (inner)
  { x:  42, y:  18, from: "#6EE7B7", to: "#059669", initials: "RL" }, // right     · green
  { x:  -4, y:  34, from: "#FDBA74", to: "#EA580C", initials: "AT" }, // bottom    · orange (inner)
  { x: -33, y:  42, from: "#93C5FD", to: "#2563EB", initials: "MH" }, // bottom-l  · blue
];

export function WorkTogetherSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 md:gap-14 lg:gap-12 items-center">

        {/* Left — Orbital avatars illustration */}
        <div className="order-2 lg:order-1 flex justify-center lg:justify-start lg:-ml-6">
          <OrbitalAvatars />
        </div>

        {/* Right — Text */}
        <div className="order-1 lg:order-2 flex flex-col gap-6 sm:gap-7 text-center lg:text-left items-center lg:items-start">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            Built for teams
          </div>

          <h2 className="font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05]">
            <span>Work </span>
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">together</span>
            </span>
          </h2>

          <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed max-w-[460px]">
            Async-first, decision-rich. Standups in Slack, design reviews in Figma,
            every change reviewed in the open. Our team plugs straight into yours.
          </p>

          <div className="mt-1">
            <Link
              href="#"
              className="group inline-flex items-center gap-2.5 bg-[#4a8fd8] hover:bg-[#3a7fcb] text-white text-sm sm:text-[15px] font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-white/10 shadow-[0_10px_30px_-6px_rgba(74,144,217,0.45)] hover:shadow-[0_16px_40px_-6px_rgba(74,144,217,0.6)] transition-all duration-300"
            >
              Meet the team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Orbital avatars composition (premium) ── */
const ORBIT_DURATION = "55s"; // slow & smooth full rotation

function OrbitalAvatars() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] aspect-square">

      {/* Soft radial halo behind everything */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full blur-3xl opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,182,255,0.18), transparent 60%)",
        }}
      />

      {/* Rotating orbit — rings + avatars carried together */}
      <div
        className="absolute inset-0"
        style={{ animation: `orbit-spin ${ORBIT_DURATION} linear infinite` }}
      >
        {/* Outer gradient ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbit-outer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#7BB6FF" stopOpacity="0.55" />
              <stop offset="50%"  stopColor="#BFDBFE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="url(#orbit-outer)"
            strokeWidth="0.9"
            strokeDasharray="3 5"
          />
        </svg>

        {/* Inner gradient ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-[22%] w-[56%] h-[56%]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbit-inner" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#A78BFA" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="url(#orbit-inner)"
            strokeWidth="0.9"
            strokeDasharray="3 5"
          />
        </svg>

        {/* Avatars — orbit with the rings, counter-rotated to stay upright */}
        {AVATARS.map((a, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${50 + a.x}%`,
              top: `${50 + a.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px] rounded-full ring-[3px] ring-white shadow-[0_8px_22px_rgba(15,23,42,0.22)] flex items-center justify-center text-white text-[10px] sm:text-[11px] md:text-xs font-bold tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                animation: `orbit-spin ${ORBIT_DURATION} linear infinite reverse`,
              }}
            >
              {/* Inner highlight ring */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), transparent 55%)",
                }}
              />
              <span className="relative">{a.initials}</span>

              {/* Presence dot */}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Center logo — static, sits above the rotating orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 bg-white rounded-full shadow-[0_18px_50px_-10px_rgba(15,23,42,0.22)] ring-1 ring-slate-100 flex items-center justify-center overflow-hidden">
        {/* Top edge highlight */}
        <span
          aria-hidden="true"
          className="absolute top-1 inset-x-5 h-px bg-slate-200/70"
        />
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12">
          <Image
            src="/logo.png"
            alt="Brand mark"
            fill
            className="object-contain"
          />
        </div>

        {/* Live presence dot */}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 ring-2 ring-white"
        />
      </div>
    </div>
  );
}
