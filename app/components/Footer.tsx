"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState, type SVGProps, type ComponentType } from "react";
import { useReveal } from "@/lib/use-reveal";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  ShieldCheck,
  Check,
} from "lucide-react";

/* ── Brand icons (lucide-react removed these in v0.292+) ── */
type BrandIcon = ComponentType<SVGProps<SVGSVGElement>>;

const LinkedinIcon: BrandIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon: BrandIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.017 1.792-4.683 4.533-4.683 1.312 0 2.686.236 2.686.236v2.971h-1.514c-1.491 0-1.956.93-1.956 1.884v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

type LinkItem = { label: string; href: string; badge?: string; external?: boolean };

const SERVICES: LinkItem[] = [
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps",     href: "/services/mobile-apps" },
  { label: "AI & Data",       href: "/services/ai-data" },
  { label: "Cloud & DevOps",  href: "/services/cloud-devops" },
  { label: "Product Design",  href: "/services/product-design" },
];

const COMPANY: LinkItem[] = [
  { label: "About",              href: "/#about" },
  { label: "Our process",        href: "/#process" },
  { label: "Careers",            href: "/careers", badge: "Hiring" },
  { label: "Contact",            href: "/schedule" },
  { label: "Schedule a meeting", href: "/schedule" },
];

const RESOURCES: LinkItem[] = [
  { label: "All articles",       href: "/resources" },
  { label: "Case studies",       href: "/work" },
  { label: "Latest postmortem",  href: "/resources/blog/migrating-4m-users" },
  { label: "Architecture notes", href: "/resources/blog/no-microservices" },
  { label: "ML in production",   href: "/resources/blog/ml-30-days" },
];

const LEGAL: LinkItem[] = [
  { label: "Privacy policy",   href: "/legal/privacy" },
  { label: "Terms of service", href: "/legal/terms" },
  { label: "Cookie policy",    href: "/legal/cookies" },
  { label: "Security",         href: "/legal/security" },
];

const SOCIAL: { icon: BrandIcon; label: string; href: string }[] = [
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/igknighttech" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/igknighttech" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "success">("idle");
  const [newsletterRef, newsletterVisible] = useReveal<HTMLDivElement>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setState("success");
      setEmail("");
      setTimeout(() => setState("idle"), 3500);
    }
  };

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#143A8E] overflow-hidden">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.32]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 30%, #000 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 30%, #000 45%, transparent 100%)",
        }}
      />

      {/* Top accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(96,144,255,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* ─────────── Newsletter strip ─────────── */}
        <div
          ref={newsletterRef}
          className={`reveal reveal-up py-12 sm:py-14 lg:py-16 border-b border-white/[0.08] ${newsletterVisible ? "reveal-in" : ""}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">

            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-[#7BB6FF]">
                  07 / NEWSLETTER
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-12 bg-gradient-to-r from-white/15 to-transparent"
                />
              </div>

              <h3 className="text-white text-[1.8rem] sm:text-[2.2rem] md:text-[2.4rem] tracking-[-0.02em] leading-[1.02]">
                <span className="font-light text-white/55">Build something</span>{" "}
                <span className="font-semibold">great with us.</span>
              </h3>
              <p className="text-white/55 mt-3 text-sm sm:text-base leading-relaxed max-w-xl">
                Monthly newsletter — engineering deep-dives, hiring news, and
                the occasional war story. No spam, ever.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-[10px] border border-white/12 bg-white/[0.03] text-white placeholder:text-white/35 focus:border-[#7BB6FF]/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#7BB6FF]/15 transition-all text-sm tracking-tight"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative flex items-center justify-center gap-2 bg-white text-slate-900 font-medium text-sm px-6 py-3.5 rounded-[10px] transition-all duration-300 whitespace-nowrap overflow-hidden tracking-tight"
                  style={{
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.5) inset, 0 0 0 1px rgba(255,255,255,0.06), 0 10px 24px -10px rgba(123,182,255,0.45)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 30%, rgba(123,182,255,0.18) 50%, transparent 70%)",
                    }}
                  />
                  {state === "success" ? (
                    <>
                      <Check className="relative w-4 h-4" strokeWidth={2.2} />
                      <span className="relative">Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">Subscribe</span>
                      <ArrowRight
                        className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                        strokeWidth={2}
                      />
                    </>
                  )}
                </button>
              </div>
              <p className="text-white/35 text-[11px] mt-3 flex items-center gap-1.5 font-mono tracking-wide">
                <ShieldCheck className="w-3 h-3" />
                By subscribing you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>

        {/* ─────────── Main grid ─────────── */}
        <div className="py-10 sm:py-12 lg:py-14 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10">

          {/* Brand block */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="Igknight Tech"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-[17px] tracking-tight">
                Igknight<span className="text-[#2783ED]">Tech</span>
              </span>
            </Link>

            <p className="mt-4 text-blue-100/60 text-sm leading-relaxed max-w-xs">
              Engineering software that ships. We partner with ambitious teams to
              design, build, and scale modern products.
            </p>

            {/* Contact strip */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-100/55 text-sm">
                <MapPin className="w-3.5 h-3.5 text-blue-200/40" />
                Remote-first · 12 countries
              </div>
              <a
                href="mailto:hello@igknight.tech"
                className="flex items-center gap-2 text-blue-100/55 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-200/40" />
                hello@igknight.tech
              </a>
            </div>

            {/* Social icons — hairline circles, no glass fill */}
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIAL.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-9 h-9 rounded-full border border-white/12 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-center"
                  >
                    <Icon
                      className="w-[14px] h-[14px] text-white/55 group-hover:text-white transition-colors"
                      strokeWidth={1.7}
                    />
                  </a>
                );
              })}
            </div>

            {/* Status pill */}
            <Link
              href="/legal/security"
              className="mt-4 group inline-flex items-center gap-2 text-blue-100/55 hover:text-white text-xs sm:text-[13px] transition-colors"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              </span>
              All systems operational
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          </div>

          {/* Link columns */}
          <FooterColumn
            title="Services"
            items={SERVICES}
            className="col-span-1 lg:col-span-2 lg:col-start-6"
          />
          <FooterColumn
            title="Company"
            items={COMPANY}
            className="col-span-1 lg:col-span-2"
          />
          <FooterColumn
            title="Resources"
            items={RESOURCES}
            className="col-span-1 lg:col-span-2"
          />
          <FooterColumn
            title="Legal"
            items={LEGAL}
            className="col-span-1 lg:col-span-2"
          />
        </div>

        {/* ─────────── Bottom bar ─────────── */}
        <div className="py-5 sm:py-6 border-t border-white/[0.08] flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-4">

          <div className="text-blue-200/45 text-xs sm:text-[13px] order-3 lg:order-1">
            © {new Date().getFullYear()} Igknight Tech. All rights reserved.
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center order-2">
            <ComplianceBadge label="SOC 2 Type II" />
            <ComplianceBadge label="GDPR" />
            <ComplianceBadge label="ISO 27001" />
          </div>

          <button
            onClick={scrollTop}
            className="group flex items-center gap-1.5 text-blue-200/45 hover:text-white text-xs sm:text-[13px] transition-colors order-1 lg:order-3"
          >
            Back to top
            <span className="w-6 h-6 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-colors">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>

      {/* Faded wordmark (decorative) */}
      <div className="relative overflow-hidden pointer-events-none select-none -mt-2 sm:-mt-3 lg:-mt-4 pb-2">
        <div
          className="text-[2.75rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter leading-[0.8] text-center whitespace-nowrap"
          style={{
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.04em",
          }}
        >
          Igknight
        </div>
      </div>
    </footer>
  );
}

/* ── Link column ── */
function FooterColumn({
  title,
  items,
  className,
}: {
  title: string;
  items: LinkItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/40">
        {title}
      </h4>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors tracking-tight"
            >
              <span className="relative">
                {item.label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </span>
              {item.badge && (
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#7BB6FF] border border-[#7BB6FF]/30 px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Compliance badge ── */
function ComplianceBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-blue-200/55 text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.02]">
      <ShieldCheck className="w-3 h-3 text-[#2783ED]" strokeWidth={2} />
      {label}
    </div>
  );
}
