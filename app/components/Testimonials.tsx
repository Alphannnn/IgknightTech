"use client";

import { Quote, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  from: string;
  to: string;
};

const COLUMN_1: Testimonial[] = [
  {
    quote:
      "Igknight rebuilt our entire booking platform in six weeks. Conversions are up 38% and our team finally trusts the codebase again.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Stratify",
    from: "#7BB6FF",
    to: "#3B82F6",
  },
  {
    quote:
      "They didn't just deliver code — they helped us think through product decisions we hadn't even framed yet. Genuine partners.",
    name: "Marcus Holloway",
    role: "Head of Product",
    company: "Northwind Labs",
    from: "#A78BFA",
    to: "#7C3AED",
  },
  {
    quote:
      "Beautifully crafted, performant, and shipped on time. The bar they set has changed how we evaluate every other vendor.",
    name: "Priya Kothari",
    role: "VP Engineering",
    company: "Helio Health",
    from: "#34D399",
    to: "#059669",
  },
  {
    quote:
      "Our mobile rewrite was complex — they handled the migration without a single regression and our App Store rating went from 3.6 to 4.7.",
    name: "James Whitfield",
    role: "Founder",
    company: "Vyra",
    from: "#FCD34D",
    to: "#D97706",
  },
];

const COLUMN_2: Testimonial[] = [
  {
    quote:
      "We brought them in for a 90-day engagement and ended up keeping them for two years. That should tell you everything.",
    name: "Elena Rodriguez",
    role: "COO",
    company: "Marlowe & Co.",
    from: "#F472B6",
    to: "#DB2777",
  },
  {
    quote:
      "Their engineers shipped our AI pipeline in production within 30 days. No hand-waving, no buzzword salad — just clean, working ML infra.",
    name: "David Park",
    role: "Director of Data",
    company: "Kepler AI",
    from: "#60A5FA",
    to: "#2563EB",
  },
  {
    quote:
      "Phenomenal communication. Daily updates, weekly demos, and a level of ownership I haven't seen from any agency in 15 years.",
    name: "Anna Lindqvist",
    role: "Product Lead",
    company: "Nordwell",
    from: "#5EEAD4",
    to: "#0D9488",
  },
  {
    quote:
      "They redesigned our entire dashboard experience. User retention went from 41% to 68% in the first quarter post-launch.",
    name: "Tomás Reyes",
    role: "CEO",
    company: "Brightline",
    from: "#FB923C",
    to: "#C2410C",
  },
];

const COLUMN_3: Testimonial[] = [
  {
    quote:
      "We've worked with the big consultancies. Igknight ships faster, costs less, and the work is honestly better in every dimension.",
    name: "Rachel Okafor",
    role: "VP Operations",
    company: "Atlas Freight",
    from: "#818CF8",
    to: "#4F46E5",
  },
  {
    quote:
      "From discovery to launch in four months — for a regulated fintech product. Whatever process they're running, it works.",
    name: "Benjamin Hayes",
    role: "Founder",
    company: "Ledger Bridge",
    from: "#67E8F9",
    to: "#0891B2",
  },
  {
    quote:
      "The design work is exceptional. We've had three users ask if we hired a famous design studio — the answer is just Igknight.",
    name: "Maya Goldberg",
    role: "Head of Brand",
    company: "Petal & Pine",
    from: "#FCA5A5",
    to: "#DC2626",
  },
  {
    quote:
      "Cloud migration without downtime, on a system serving 4M users daily. I genuinely don't know how they pulled it off.",
    name: "Hiroshi Tanaka",
    role: "Principal Engineer",
    company: "Aurora Networks",
    from: "#86EFAC",
    to: "#16A34A",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 scroll-mt-20">

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        {/* Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14 lg:mb-16">

          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            Client Stories
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
          </div>

          <h2 className="mt-5 font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05]">
            What our{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">clients</span>
            </span>{" "}
            say
          </h2>

          <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed">
            Real teams. Real outcomes. Here&apos;s what they say about working with us — in their own words.
          </p>
        </div>

        {/* Marquee columns */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 h-[560px] sm:h-[600px] md:h-[640px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <Column items={COLUMN_1} direction="up" duration="60s" />
          <Column
            items={COLUMN_2}
            direction="down"
            duration="75s"
            className="hidden md:flex"
          />
          <Column
            items={COLUMN_3}
            direction="up"
            duration="55s"
            className="hidden lg:flex"
          />
        </div>

      </div>
    </section>
  );
}

/* ── Single scrolling column ── */
function Column({
  items,
  direction,
  duration,
  className = "",
}: {
  items: Testimonial[];
  direction: "up" | "down";
  duration: string;
  className?: string;
}) {
  const doubled = [...items, ...items];
  const animationName = direction === "up" ? "marquee-up" : "marquee-down";

  return (
    <div className={`group relative flex flex-col ${className}`}>
      <div
        className="flex flex-col gap-4 sm:gap-5 group-hover:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${duration} linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

/* ── Single testimonial card ── */
function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group/card relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 cursor-default">

      {/* Quote glyph (decorative) */}
      <div className="absolute top-5 right-5 opacity-30 group-hover/card:opacity-100 transition-opacity duration-500">
        <Quote
          className="w-6 h-6 text-amber-300"
          strokeWidth={2}
          fill="currentColor"
        />
      </div>

      {/* Rating */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
            strokeWidth={1.5}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 text-slate-700 text-[14px] sm:text-[15px] leading-relaxed">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-[13px] tracking-tight ring-2 ring-white shadow-[0_2px_8px_rgba(15,23,42,0.12)]"
          style={{
            background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
          }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-slate-900 text-sm font-bold truncate">
            {t.name}
          </div>
          <div className="text-slate-500 text-xs mt-0.5 truncate">
            {t.role} · <span className="font-medium">{t.company}</span>
          </div>
        </div>
      </div>

    </article>
  );
}
