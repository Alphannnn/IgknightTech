"use client";

import { useReveal } from "@/lib/use-reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const COLUMN_1: Testimonial[] = [
  {
    quote:
      "Igknight rebuilt our entire booking platform in six weeks. Conversions are up 38% and our team finally trusts the codebase again.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Stratify",
  },
  {
    quote:
      "They didn't just deliver code — they helped us think through product decisions we hadn't even framed yet. Genuine partners.",
    name: "Marcus Holloway",
    role: "Head of Product",
    company: "Northwind Labs",
  },
  {
    quote:
      "Beautifully crafted, performant, and shipped on time. The bar they set has changed how we evaluate every other vendor.",
    name: "Priya Kothari",
    role: "VP Engineering",
    company: "Helio Health",
  },
  {
    quote:
      "Our mobile rewrite was complex — they handled the migration without a single regression and our App Store rating went from 3.6 to 4.7.",
    name: "James Whitfield",
    role: "Founder",
    company: "Vyra",
  },
];

const COLUMN_2: Testimonial[] = [
  {
    quote:
      "We brought them in for a 90-day engagement and ended up keeping them for two years. That should tell you everything.",
    name: "Elena Rodriguez",
    role: "COO",
    company: "Marlowe & Co.",
  },
  {
    quote:
      "Their engineers shipped our AI pipeline in production within 30 days. No hand-waving, no buzzword salad — just clean, working ML infra.",
    name: "David Park",
    role: "Director of Data",
    company: "Kepler AI",
  },
  {
    quote:
      "Phenomenal communication. Daily updates, weekly demos, and a level of ownership I haven't seen from any agency in 15 years.",
    name: "Anna Lindqvist",
    role: "Product Lead",
    company: "Nordwell",
  },
  {
    quote:
      "They redesigned our entire dashboard experience. User retention went from 41% to 68% in the first quarter post-launch.",
    name: "Tomás Reyes",
    role: "CEO",
    company: "Brightline",
  },
];

const COLUMN_3: Testimonial[] = [
  {
    quote:
      "We've worked with the big consultancies. Igknight ships faster, costs less, and the work is honestly better in every dimension.",
    name: "Rachel Okafor",
    role: "VP Operations",
    company: "Atlas Freight",
  },
  {
    quote:
      "From discovery to launch in four months — for a regulated fintech product. Whatever process they're running, it works.",
    name: "Benjamin Hayes",
    role: "Founder",
    company: "Ledger Bridge",
  },
  {
    quote:
      "The design work is exceptional. We've had three users ask if we hired a famous design studio — the answer is just Igknight.",
    name: "Maya Goldberg",
    role: "Head of Brand",
    company: "Petal & Pine",
  },
  {
    quote:
      "Cloud migration without downtime, on a system serving 4M users daily. I genuinely don't know how they pulled it off.",
    name: "Hiroshi Tanaka",
    role: "Principal Engineer",
    company: "Aurora Networks",
  },
];

export default function Testimonials() {
  const [headerRef, headerVisible] = useReveal<HTMLElement>();

  return (
    <section
      id="testimonials"
      className="relative w-full bg-white overflow-hidden py-24 sm:py-28 md:py-32 lg:py-36 scroll-mt-20"
    >

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* ── Editorial header */}
        <header
          ref={headerRef}
          className={`reveal reveal-up flex flex-col gap-6 sm:gap-7 max-w-3xl mb-14 sm:mb-16 lg:mb-20 ${headerVisible ? "reveal-in" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-[#2783ED]"
            >
              06 / CLIENT STORIES
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-slate-300 to-transparent"
            />
          </div>

          <h2 className="text-slate-900 tracking-[-0.02em] leading-[0.98] text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem]">
            <span className="font-light text-slate-400">What our</span>
            <br />
            <span className="font-semibold">clients say.</span>
          </h2>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
            Real teams. Real outcomes. Here&apos;s what they say about working
            with us — in their own words.
          </p>
        </header>

        {/* Marquee columns */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 h-[580px] sm:h-[640px] md:h-[700px] overflow-hidden"
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

/* ── Single testimonial card — editorial, no gradient avatar, no quote glyph */
function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group/card relative bg-white p-6 sm:p-7 border border-slate-200/80 rounded-[12px] hover:border-slate-300 transition-colors duration-300 cursor-default overflow-hidden">

      {/* Top light-line sheen on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#2783ED]/60 to-transparent scale-x-0 group-hover/card:scale-x-100 origin-left transition-transform duration-500"
      />

      {/* Decorative quote glyph — used as typographic mark, not as icon */}
      <span
        aria-hidden="true"
        className="absolute -top-2 right-5 font-serif text-[5rem] leading-none text-slate-100 select-none pointer-events-none"
      >
        &ldquo;
      </span>

      {/* Quote */}
      <p className="relative text-slate-800 text-[15px] sm:text-[15.5px] leading-[1.6] font-normal">
        {t.quote}
      </p>

      {/* Hairline divider */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
        {/* Monogram in hairline ring — no color, premium restraint */}
        <div className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 font-medium text-[12px] tracking-tight bg-slate-50/60">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-slate-900 text-sm font-medium truncate tracking-tight">
            {t.name}
          </div>
          <div className="mt-0.5 font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase truncate">
            {t.role} · {t.company}
          </div>
        </div>
      </div>

    </article>
  );
}
