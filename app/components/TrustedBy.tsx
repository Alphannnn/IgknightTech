"use client";

import { MouseEvent as ReactMouseEvent } from "react";

/* ── Company wordmarks (swap with your real brand logos later) ── */
const COMPANIES_ROW_1 = [
  { name: "ACME",     tw: "tracking-[0.3em] font-black" },
  { name: "Quantix",  tw: "tracking-tight font-extrabold" },
  { name: "VOLT",     tw: "tracking-[0.35em] font-black" },
  { name: "Lumen",    tw: "tracking-normal font-light italic" },
  { name: "Stratos",  tw: "tracking-tight font-bold" },
  { name: "NEXUS",    tw: "tracking-[0.2em] font-black" },
  { name: "Apex",     tw: "tracking-wide font-extrabold" },
];

const COMPANIES_ROW_2 = [
  { name: "Photon",    tw: "tracking-tight font-mono font-bold" },
  { name: "Cipher",    tw: "tracking-normal font-extrabold" },
  { name: "Catalyst",  tw: "tracking-tight font-semibold italic" },
  { name: "Forge",     tw: "tracking-wide font-black" },
  { name: "Helix",     tw: "tracking-normal font-bold" },
  { name: "Pulse",     tw: "tracking-[0.25em] font-extrabold" },
  { name: "Nimbus",    tw: "tracking-widest font-light" },
];

const STATS = [
  { value: "500+",  label: "Teams worldwide" },
  { value: "20+",   label: "Industries served" },
  { value: "10M+",  label: "Tasks completed" },
  { value: "99.9%", label: "Uptime SLA" },
];

export default function TrustedBy() {
  const trackMouse = (e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative w-full bg-[#0C1C3D] overflow-hidden py-24 sm:py-28 md:py-32">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
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

      {/* Top accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(96,144,255,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Bottom subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 100%, rgba(0,0,0,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* Heading block */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
            Industry Trust
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
          </div>

          <h2 className="mt-5 text-white font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Trusted by these{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              companies
            </span>
          </h2>

          <p className="mt-5 text-blue-100/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            From early-stage startups to global enterprises, high-performing
            teams across the world build with Igknight.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s) => (
            <div
              key={s.value}
              onMouseMove={trackMouse}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 sm:px-7 py-6 sm:py-8 hover:border-blue-400/40 transition-all duration-500 overflow-hidden cursor-default"
            >
              {/* Mouse-tracked spotlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--mx) var(--my), rgba(123,182,255,0.20), transparent 60%)",
                }}
              />

              {/* Top edge accent on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 bg-gradient-to-r from-transparent via-blue-300/70 to-transparent transition-all duration-500" />

              <div className="relative">
                <div
                  className="text-white text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight"
                  style={{ textShadow: "0 0 40px rgba(123,182,255,0.25)" }}
                >
                  {s.value}
                </div>
                <div className="mt-2 text-blue-200/60 text-xs sm:text-sm font-medium">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logo marquee */}
        <div className="mt-16 sm:mt-20 lg:mt-24 space-y-6 sm:space-y-8">
          <Marquee items={COMPANIES_ROW_1} direction="left" />
          <Marquee items={COMPANIES_ROW_2} direction="right" />
        </div>

      </div>
    </section>
  );
}

/* ── Marquee row ── */
function Marquee({
  items,
  direction,
}: {
  items: { name: string; tw: string }[];
  direction: "left" | "right";
}) {
  const items2x = [...items, ...items];

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-14 sm:gap-20 md:gap-24 group-hover:[animation-play-state:paused]"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} 45s linear infinite`,
        }}
      >
        {items2x.map((item, i) => (
          <span
            key={i}
            className={`flex-shrink-0 select-none text-2xl sm:text-3xl md:text-[2rem] text-white/40 hover:text-white transition-all duration-300 hover:scale-[1.08] cursor-pointer ${item.tw}`}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
