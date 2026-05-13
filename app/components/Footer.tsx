"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState, type SVGProps, type ComponentType } from "react";
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

const TwitterIcon: BrandIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon: BrandIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon: BrandIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const InstagramIcon: BrandIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
  { icon: TwitterIcon,   label: "Twitter / X",  href: "https://twitter.com/igknighttech" },
  { icon: LinkedinIcon,  label: "LinkedIn",     href: "https://linkedin.com/company/igknight-tech" },
  { icon: GithubIcon,    label: "GitHub",       href: "https://github.com/igknight-tech" },
  { icon: InstagramIcon, label: "Instagram",    href: "https://instagram.com/igknighttech" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "success">("idle");

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
    <footer className="relative bg-[#0C1C3D] overflow-hidden">

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
        <div className="py-10 sm:py-12 lg:py-14 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-10 items-center">

            <div>
              <h3 className="text-white text-2xl sm:text-3xl md:text-[2.25rem] font-extrabold tracking-tight leading-[1.1]">
                Build something{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  great
                </span>{" "}
                with us.
              </h3>
              <p className="text-blue-100/60 mt-2.5 text-sm sm:text-base leading-relaxed max-w-xl">
                Monthly newsletter — engineering deep-dives, hiring news, and
                the occasional war story. No spam, ever.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-blue-200/40 focus:border-[#7BB6FF]/60 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-[#7BB6FF]/10 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.55)] whitespace-nowrap"
                >
                  {state === "success" ? (
                    <>
                      <Check className="w-4 h-4" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-blue-200/40 text-xs mt-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                By subscribing, you agree to our privacy policy.
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
                Igknight<span className="text-[#4f9ef8]">Tech</span>
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

            {/* Social icons */}
            <div className="mt-4 flex items-center gap-2">
              {SOCIAL.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  >
                    <Icon
                      className="w-4 h-4 text-blue-100/60 group-hover:text-white transition-colors"
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
      <h4 className="text-white text-[13px] font-bold tracking-tight uppercase">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-2 text-blue-100/55 hover:text-white text-sm transition-colors"
            >
              <span className="relative">
                {item.label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </span>
              {item.badge && (
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] bg-[#4f9ef8]/15 text-[#7BB6FF] px-1.5 py-0.5 rounded-full border border-[#4f9ef8]/25">
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
      <ShieldCheck className="w-3 h-3 text-[#4f9ef8]" strokeWidth={2} />
      {label}
    </div>
  );
}
