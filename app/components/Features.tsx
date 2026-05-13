"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Features() {
  return (
    <>
      <ProjectManagementSection />
      <WorkTogetherSection />
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Shared atoms                                                */
/* ─────────────────────────────────────────────────────────── */

function SectionNumber({ value }: { value: string }) {
  return (
    <div
      aria-hidden="true"
      className="font-mono tabular-nums text-slate-200/90 text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] leading-none tracking-tighter pointer-events-none select-none"
      style={{ letterSpacing: "-0.05em" }}
    >
      {value}
    </div>
  );
}

function PremiumCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-3 text-sm sm:text-[15px] font-bold tracking-tight text-slate-900"
    >
      <span className="relative">
        {label}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 -bottom-1 h-px bg-slate-900 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"
        />
      </span>
      <span
        aria-hidden="true"
        className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden text-white transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, #5aa3e3 0%, #4a8fd8 50%, #3a7fcb 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.25) inset, 0 0 0 1px rgba(15,23,42,0.04), 0 10px 24px -10px rgba(74,144,217,0.55), 0 20px 40px -16px rgba(74,144,217,0.35)",
        }}
      >
        {/* Sheen on hover */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
          }}
        />
        <ArrowUpRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
      </span>
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-slate-500 uppercase">
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-slate-900"
      />
      <span>{children}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Section 1 — Project Management (text left, mockup right)   */
/* ─────────────────────────────────────────────────────────── */
export function ProjectManagementSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-white overflow-hidden py-24 sm:py-28 md:py-36 lg:py-40 scroll-mt-20"
    >
      {/* Faint decorative grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 60% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 60% 50%, #000 30%, transparent 100%)",
        }}
      />

      {/* Color washes */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-[-10%] w-[720px] h-[720px] rounded-full opacity-[0.18] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,182,255,0.55), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 w-[560px] h-[560px] rounded-full opacity-[0.16] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.55), transparent 70%)",
        }}
      />

      {/* Decorative topographic lines — bottom left */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 sm:-left-6 -bottom-6 sm:bottom-8 w-[280px] sm:w-[340px] md:w-[420px] text-slate-200"
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

      {/* Editorial section number — top right */}
      <div
        aria-hidden="true"
        className="absolute top-8 right-4 sm:top-12 sm:right-10 md:top-16 md:right-16 pointer-events-none"
      >
        <SectionNumber value="01" />
      </div>

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 md:gap-16 lg:gap-14 items-center">

        {/* Left — Text */}
        <div className="flex flex-col gap-7 sm:gap-8 text-center lg:text-left items-center lg:items-start lg:-ml-6">

          <Eyebrow>Built for shipping</Eyebrow>

          <h2 className="font-extrabold tracking-tight text-slate-900 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] leading-[0.98]">
            <span className="block">Project</span>
            <span className="relative inline-block mt-1 sm:mt-2">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 md:bottom-3 h-3 sm:h-4 md:h-[20px] bg-amber-300/85 rounded-[4px]"
              />
              <span className="relative">Management</span>
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg md:text-[1.2rem] leading-relaxed max-w-[520px]">
            Real timelines, real status, real visibility. From kickoff to launch,
            you see what we&apos;re building, who&apos;s on it, and what ships next —
            no opaque agency black boxes.
          </p>

          <div className="mt-3">
            <PremiumCTA href="/#process" label="See how we ship" />
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
const VIDEO_SRC    = "/project.mp4";
const VIDEO_POSTER = "/project-demo-poster.jpg";

function ProjectBoardMockup() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
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
    <div className="relative w-full max-w-[420px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[660px] aspect-[16/10]">

      {/* Ambient halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-20 rounded-[3rem] blur-3xl opacity-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 55% 45%, rgba(123,182,255,0.3), transparent 70%)",
        }}
      />

      {/* Atmospheric color orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-8 -left-12 w-36 h-36 rounded-full opacity-55 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -right-10 w-44 h-44 rounded-full opacity-55 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-14 w-28 h-28 rounded-full opacity-45 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #67E8F9, transparent 70%)" }}
      />

      {/* Decorative corner SVG marks — purely ornamental */}
      <svg
        aria-hidden="true"
        className="absolute -top-3 -left-3 w-6 h-6 text-slate-300 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M2 8 L2 2 L8 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -top-3 -right-3 w-6 h-6 text-slate-300 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 8 L22 2 L16 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -bottom-3 -left-3 w-6 h-6 text-slate-300 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M2 16 L2 22 L8 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 w-6 h-6 text-slate-300 pointer-events-none"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 16 L22 22 L16 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Outer gradient ring — frame within a frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-[6px] rounded-[1.4rem] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(123,182,255,0.6), rgba(167,139,250,0.25) 50%, rgba(123,182,255,0.6))",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Premium video frame */}
      <div
        className="absolute inset-0 rounded-2xl border border-slate-200/70 overflow-hidden bg-gradient-to-br from-[#0C1C3D] via-[#0F1F45] to-[#0C1C3D]"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.7) inset, 0 0 0 1px rgba(15,23,42,0.05), 0 14px 32px -14px rgba(15,23,42,0.22), 0 60px 110px -40px rgba(15,23,42,0.45)",
        }}
      >
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

        {/* Inner top-edge highlight */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        />
        {/* Inner bottom shadow */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
          }}
        />
        {/* Soft vignette */}
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 100% at 50% 50%, transparent 60%, rgba(0,0,0,0.18))",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Section 2 — Work Together (orbital avatars left, text right) */
/* ─────────────────────────────────────────────────────────── */

const AVATARS: { x: number; y: number; from: string; to: string; initials: string }[] = [
  { x: -33, y: -40, from: "#FCD34D", to: "#F59E0B", initials: "JW" },
  { x:  -2, y: -32, from: "#34D399", to: "#10B981", initials: "PK" },
  { x:  32, y: -38, from: "#93C5FD", to: "#3B82F6", initials: "SC" },
  { x: -45, y:  -2, from: "#FCA5A5", to: "#EF4444", initials: "HT" },
  { x: -22, y:   6, from: "#93C5FD", to: "#2563EB", initials: "DP" },
  { x:  22, y:   6, from: "#5EEAD4", to: "#0D9488", initials: "MG" },
  { x:  42, y:  18, from: "#6EE7B7", to: "#059669", initials: "RL" },
  { x:  -4, y:  34, from: "#FDBA74", to: "#EA580C", initials: "AT" },
  { x: -33, y:  42, from: "#93C5FD", to: "#2563EB", initials: "MH" },
];

/** Decorative satellite dots distributed on an orbit ring */
const SATELLITES: { angle: number; r: number; size: number }[] = [
  { angle: 18,  r: 98, size: 2.2 },
  { angle: 72,  r: 98, size: 1.4 },
  { angle: 145, r: 98, size: 2.0 },
  { angle: 200, r: 98, size: 1.4 },
  { angle: 252, r: 98, size: 2.4 },
  { angle: 312, r: 98, size: 1.6 },
];

export function WorkTogetherSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-24 sm:py-28 md:py-36 lg:py-40">

      {/* Faint decorative grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 40% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 40% 50%, #000 30%, transparent 100%)",
        }}
      />

      {/* Color washes */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-[-8%] w-[640px] h-[640px] rounded-full opacity-[0.16] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.55), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-[-8%] w-[640px] h-[640px] rounded-full opacity-[0.14] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,182,255,0.55), transparent 70%)",
        }}
      />

      {/* Editorial section number — top left */}
      <div
        aria-hidden="true"
        className="absolute top-8 left-4 sm:top-12 sm:left-10 md:top-16 md:left-16 pointer-events-none"
      >
        <SectionNumber value="02" />
      </div>

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-14 md:gap-16 lg:gap-14 items-center">

        {/* Left — Orbital avatars illustration */}
        <div className="order-2 lg:order-1 flex justify-center lg:justify-start lg:-ml-6">
          <OrbitalAvatars />
        </div>

        {/* Right — Text */}
        <div className="order-1 lg:order-2 flex flex-col gap-7 sm:gap-8 text-center lg:text-left items-center lg:items-start">

          <Eyebrow>Built for teams</Eyebrow>

          <h2 className="font-extrabold tracking-tight text-slate-900 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] leading-[0.98]">
            <span>Work </span>
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 md:bottom-3 h-3 sm:h-4 md:h-[20px] bg-amber-300/85 rounded-[4px]"
              />
              <span className="relative">together</span>
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg md:text-[1.2rem] leading-relaxed max-w-[520px]">
            Async-first, decision-rich. Standups in Slack, design reviews in Figma,
            every change reviewed in the open. Our team plugs straight into yours.
          </p>

          <div className="mt-3">
            <PremiumCTA href="/work" label="See our work" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Orbital avatars composition (premium) ── */
const ORBIT_DURATION = "60s";

function OrbitalAvatars() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[580px] aspect-square">

      {/* Soft radial halo behind everything */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full blur-3xl opacity-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,182,255,0.22), transparent 60%)",
        }}
      />

      {/* Atmospheric color orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -right-8 w-36 h-36 rounded-full opacity-55 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FCD34D, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -left-6 w-40 h-40 rounded-full opacity-50 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #34D399, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-12 w-32 h-32 rounded-full opacity-45 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F472B6, transparent 70%)" }}
      />

      {/* Static outermost ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -inset-[3%] w-[106%] h-[106%]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbit-outermost" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#7BB6FF" stopOpacity="0.42" />
            <stop offset="50%"  stopColor="#A78BFA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke="url(#orbit-outermost)"
          strokeWidth="0.6"
        />
      </svg>

      {/* Rotating orbit */}
      <div
        className="absolute inset-0"
        style={{ animation: `orbit-spin ${ORBIT_DURATION} linear infinite` }}
      >
        {/* Outer gradient ring with satellite dots */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbit-outer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#7BB6FF" stopOpacity="0.85" />
              <stop offset="35%"  stopColor="#BFDBFE" stopOpacity="0.2" />
              <stop offset="65%"  stopColor="#A78BFA" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="sat-grad">
              <stop offset="0%" stopColor="#7BB6FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0.5" />
            </radialGradient>
          </defs>
          {/* Base solid ring for grounding */}
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="rgba(123,182,255,0.14)"
            strokeWidth="0.6"
          />
          {/* Dashed gradient ring */}
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="url(#orbit-outer)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          {/* Satellite dots distributed on the ring */}
          {SATELLITES.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const cx = 100 + s.r * Math.cos(rad);
            const cy = 100 + s.r * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={s.size}
                fill="url(#sat-grad)"
              />
            );
          })}
        </svg>

        {/* Inner gradient ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-[22%] w-[56%] h-[56%]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbit-inner" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#A78BFA" stopOpacity="0.6" />
              <stop offset="50%"  stopColor="#BFDBFE" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="rgba(167,139,250,0.14)"
            strokeWidth="0.6"
          />
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="url(#orbit-inner)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        </svg>

        {/* Avatars */}
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
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-[54px] md:h-[54px] rounded-full ring-[3px] ring-white flex items-center justify-center text-white text-[10px] sm:text-[11px] md:text-xs font-bold tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                animation: `orbit-spin ${ORBIT_DURATION} linear infinite reverse`,
                boxShadow: `0 1px 0 rgba(255,255,255,0.4) inset, 0 8px 18px -6px ${a.to}66, 0 16px 36px -10px rgba(15,23,42,0.26)`,
              }}
            >
              {/* Inner highlight */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55), transparent 55%)",
                }}
              />
              <span className="relative">{a.initials}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Center logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-[78px] sm:h-[78px] md:w-[92px] md:h-[92px] bg-white rounded-full flex items-center justify-center overflow-hidden"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.95) inset, 0 0 0 1px rgba(15,23,42,0.06), 0 22px 60px -12px rgba(15,23,42,0.32), 0 0 0 10px rgba(255,255,255,0.55)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-1 inset-x-5 h-px bg-slate-200/80"
        />
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
          <Image
            src="/logo.png"
            alt="Brand mark"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
