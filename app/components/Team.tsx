"use client";

import Image from "next/image";

type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
  accent: string;
};

/* Drop portraits at /public/team/<id>.jpg — or change the paths below. */
const TEAM: Member[] = [
  {
    name: "Sarah Chen",
    role: "Co-founder · CEO",
    bio: "Previously product at Stripe and Linear. Builds engineering orgs that ship without theatre.",
    image: "/team/sarah-chen.jpg",
    accent: "#7BB6FF",
  },
  {
    name: "Hiroshi Tanaka",
    role: "Co-founder · CTO",
    bio: "Infrastructure at Cloudflare and Datadog. Zero-downtime migrations at planet scale.",
    image: "/team/hiroshi-tanaka.jpg",
    accent: "#67E8F9",
  },
  {
    name: "Marcus Holloway",
    role: "Head of Design",
    bio: "Design systems at Figma and Notion. Treats craft as the moat — not the polish.",
    image: "/team/marcus-holloway.jpg",
    accent: "#A78BFA",
  },
  {
    name: "David Park",
    role: "Head of AI",
    bio: "ML at Google Brain. Turns research papers into models serving real production traffic.",
    image: "/team/david-park.jpg",
    accent: "#F472B6",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative w-full bg-white overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 scroll-mt-20"
    >
      {/* Soft ambient halo */}
      <div
        aria-hidden="true"
        className="absolute -top-20 right-0 w-[520px] h-[520px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,182,255,0.16), transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-14 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
            The leadership
            <span className="h-px w-6 sm:w-8 bg-slate-300" />
          </div>

          <h2 className="font-extrabold tracking-tight text-slate-900 text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.05]">
            <span>Meet the </span>
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2.5 sm:h-3 md:h-[14px] bg-amber-300/85 rounded-[3px]"
              />
              <span className="relative">team</span>
            </span>
          </h2>

          <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed max-w-[540px]">
            Four founders and senior leads who shaped the company.
            You&apos;ll meet them on the first call — and on every one after.
          </p>
        </div>

        {/* 4-up grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
          {TEAM.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: Member }) {
  return (
    <div className="group flex flex-col">

      {/* Portrait */}
      <div
        className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-[0_18px_50px_-22px_rgba(15,23,42,0.28)] hover:shadow-[0_28px_70px_-22px_rgba(15,23,42,0.4)] transition-shadow duration-500"
        style={{
          background: `linear-gradient(135deg, ${member.accent}22, ${member.accent}05)`,
        }}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />

        {/* Top accent bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
          style={{ background: member.accent }}
        />

        {/* Bottom accent wash on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 60%, ${member.accent}26 100%)`,
          }}
        />
      </div>

      {/* Body */}
      <div className="mt-5 sm:mt-6">
        <div
          className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: member.accent }}
        >
          {member.role}
        </div>

        <h3 className="mt-1.5 text-slate-900 text-xl sm:text-[1.375rem] font-bold tracking-tight leading-tight">
          {member.name}
        </h3>

        <p className="mt-2.5 text-slate-500 text-[13.5px] sm:text-sm leading-relaxed">
          {member.bio}
        </p>
      </div>
    </div>
  );
}
