"use client";

import { useReveal, useCountUp } from "@/lib/use-reveal";

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
  { value: "500+",  label: "Teams worldwide", caption: "across 12 countries" },
  { value: "20+",   label: "Industries served", caption: "fintech to health" },
  { value: "10M+",  label: "Tasks completed", caption: "delivered on schedule" },
  { value: "99.9%", label: "Uptime SLA", caption: "production guarantee" },
];

export default function TrustedBy() {
  const [headerRef, headerVisible] = useReveal<HTMLElement>();
  const [stripRef, stripVisible] = useReveal<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section
      id="trusted-by"
      className="relative w-full bg-[#143A8E] overflow-hidden py-24 sm:py-28 md:py-32 scroll-mt-20"
    >

      {/* Hairline grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* ── Editorial header */}
        <header
          ref={headerRef}
          className={`reveal reveal-up flex flex-col gap-6 sm:gap-7 max-w-3xl ${headerVisible ? "reveal-in" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-[#7BB6FF]"
            >
              05 / TRUST
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-white/15 to-transparent"
            />
          </div>

          <h2 className="text-white tracking-[-0.02em] leading-[0.98] text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem]">
            <span className="font-light text-white/55">Trusted by</span>
            <br />
            <span className="font-semibold">teams that ship.</span>
          </h2>

          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-xl">
            From early-stage startups to global enterprises — high-performing
            teams across the world build with Igknight.
          </p>
        </header>

        {/* ── Editorial stat strip — no cards, just type + dividers */}
        <div
          ref={stripRef}
          className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 border-y border-white/[0.08]"
        >
          {STATS.map((s, i) => (
            <StatCell
              key={s.value}
              stat={s}
              index={i}
              visible={stripVisible}
            />
          ))}
        </div>

        {/* ── Logo marquee — kept, but caption added for context */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-white/35 uppercase mb-8 sm:mb-10">
            Selected partners
          </div>

          <div className="space-y-6 sm:space-y-8">
            <Marquee items={COMPANIES_ROW_1} direction="left" />
            <Marquee items={COMPANIES_ROW_2} direction="right" />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Single stat cell — count-up + hover sheen + scroll reveal ── */
function StatCell({
  stat,
  index,
  visible,
}: {
  stat: { value: string; label: string; caption: string };
  index: number;
  visible: boolean;
}) {
  const animatedValue = useCountUp(stat.value, { visible, duration: 1500 });

  const borderClasses = [
    index < 2 ? "border-b lg:border-b-0 border-white/[0.08]" : "",
    index % 2 === 0 ? "border-r border-white/[0.08]" : "lg:border-r lg:border-white/[0.08]",
    index === 3 ? "lg:border-r-0" : "",
  ].join(" ");

  return (
    <div
      className={`reveal reveal-up group relative py-8 sm:py-10 lg:py-12 px-5 sm:px-7 lg:px-9 ${borderClasses} ${visible ? "reveal-in" : ""}`}
      style={{ transitionDelay: visible ? `${index * 110}ms` : "0ms" }}
    >
      {/* Index */}
      <div className="font-mono text-[10px] tracking-[0.28em] text-white/35 uppercase mb-5">
        {String(index + 1).padStart(2, "0")} — Metric
      </div>

      {/* Value — counts up on enter */}
      <div className="text-white text-[2.6rem] sm:text-[3.4rem] md:text-[4rem] lg:text-[4.4rem] font-light tracking-[-0.03em] leading-[0.9] tabular-nums group-hover:text-[#CDE2FE] transition-colors duration-500">
        {animatedValue}
      </div>

      {/* Label */}
      <div className="mt-4 text-white text-[14px] sm:text-[15px] font-medium tracking-tight">
        {stat.label}
      </div>

      <div className="mt-1 font-mono text-[10px] sm:text-[11px] tracking-[0.16em] text-white/35 uppercase">
        {stat.caption}
      </div>

      {/* Accent line — animates in once visible, then sheen-sweeps on hover */}
      <span
        aria-hidden="true"
        className="absolute left-5 right-5 sm:left-7 sm:right-7 lg:left-9 lg:right-9 bottom-0 h-px origin-left transition-transform duration-700"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(123,182,255,0.55), transparent)",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: visible ? `${index * 110 + 500}ms` : "0ms",
        }}
      />
    </div>
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
            className={`flex-shrink-0 select-none text-2xl sm:text-3xl md:text-[2rem] text-white/35 hover:text-white transition-all duration-300 cursor-default ${item.tw}`}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
