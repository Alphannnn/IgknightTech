"use client";

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
/*  Section 1 — Project Management (text left, image right)   */
/* ─────────────────────────────────────────────────────────── */
export function ProjectManagementSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">

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
            Images, videos, PDFs and audio files are supported. Create math
            expressions and diagrams directly from the app. Take photos with
            the mobile app and save them to a note.
          </p>

          <div className="mt-1">
            <Link
              href="#"
              className="group inline-flex items-center gap-2.5 bg-[#4a8fd8] hover:bg-[#3a7fcb] text-white text-sm sm:text-[15px] font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-[0_8px_24px_rgba(74,144,217,0.35)] hover:shadow-[0_12px_32px_rgba(74,144,217,0.5)] transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

        </div>

        {/* Right — Illustration */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[620px] aspect-[5/4]">
            <Image
              src="/project-management-illustration.png"
              alt="Team collaborating in a project management meeting"
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 620px"
              className="object-contain object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Section 2 — Work Together (orbital avatars left, text right) */
/* ─────────────────────────────────────────────────────────── */

const AVATARS: { x: number; y: number; from: string; to: string }[] = [
  { x: -33, y: -40, from: "#FCD34D", to: "#F59E0B" }, // top-left  · yellow
  { x:  -2, y: -32, from: "#34D399", to: "#10B981" }, // top       · green (inner)
  { x:  32, y: -38, from: "#93C5FD", to: "#3B82F6" }, // top-right · blue
  { x: -45, y:  -2, from: "#FCA5A5", to: "#EF4444" }, // left      · red
  { x: -22, y:   6, from: "#93C5FD", to: "#2563EB" }, // mid-left  · blue (inner)
  { x:  22, y:   6, from: "#5EEAD4", to: "#0D9488" }, // mid-right · teal (inner)
  { x:  42, y:  18, from: "#6EE7B7", to: "#059669" }, // right     · green
  { x:  -4, y:  34, from: "#FDBA74", to: "#EA580C" }, // bottom    · orange (inner)
  { x: -33, y:  42, from: "#93C5FD", to: "#2563EB" }, // bottom-l  · blue
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
            With whitepace, share your notes with your colleagues and
            collaborate on them. You can also publish a note to the internet
            and share the URL with others.
          </p>

          <div className="mt-1">
            <Link
              href="#"
              className="group inline-flex items-center gap-2.5 bg-[#4a8fd8] hover:bg-[#3a7fcb] text-white text-sm sm:text-[15px] font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-[0_8px_24px_rgba(74,144,217,0.35)] hover:shadow-[0_12px_32px_rgba(74,144,217,0.5)] transition-all duration-300"
            >
              Try it now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ── Orbital avatars composition ── */
const ORBIT_DURATION = "55s"; // slow & smooth full rotation

function OrbitalAvatars() {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] aspect-square">

      {/* Rotating orbit — rings + avatars carried together */}
      <div
        className="absolute inset-0"
        style={{ animation: `orbit-spin ${ORBIT_DURATION} linear infinite` }}
      >
        {/* Outer dashed ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="#BFDBFE"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Inner dashed ring */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-[22%] w-[56%] h-[56%]"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="#BFDBFE"
            strokeWidth="0.8"
            strokeDasharray="4 4"
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
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px] rounded-full ring-[3px] ring-white shadow-[0_6px_18px_rgba(15,23,42,0.18)]"
              style={{
                background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                animation: `orbit-spin ${ORBIT_DURATION} linear infinite reverse`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Center card with image — static, sits above the rotating orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 flex items-center justify-center overflow-hidden">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11">
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
