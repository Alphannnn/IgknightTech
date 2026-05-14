"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountPanel from "./AccountPanel";
import {
  ChevronDown,
  X,
  Menu,
  ArrowRight,
  ArrowUpRight,
  // Services
  Code2,
  Globe,
  Smartphone,
  Sparkles,
  Cloud,
  Palette,
  // Work / Case studies (real projects)
  Send,
  TrendingUp,
  Calendar,
  CreditCard,
  Layers,
  // Solutions
  Rocket,
  Wallet,
  HeartPulse,
  ShoppingBag,
  Building2,
  // Company
  Building,
  Briefcase,
  Workflow,
  Users,
  Award,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

/* ────────────── Types ────────────── */

type MegaItem = {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  tag: string;
  href: string;
  badge?: string;
};

type NavLink = {
  label: string;
  /** When set, renders as a plain link with no mega dropdown. */
  simpleHref?: string;
  items?: MegaItem[];
  headerTitle?: string;
  headerSubtitle?: string;
  footerText?: string;
  footerCtaText?: string;
  footerCtaHref?: string;
  viewAllHref?: string;
  align?: "center" | "right";
};

/* ────────────── Navigation data ────────────── */

const navLinks: NavLink[] = [
  {
    label: "Work",
    headerTitle: "Selected Case Studies",
    headerSubtitle: "A look at projects we've shipped — and what they shipped to.",
    footerText: "Have a project in mind?",
    footerCtaText: "Start a project",
    footerCtaHref: "/schedule",
    viewAllHref: "/work",
    items: [
      { title: "Zentap",        desc: "Marketing automation that streamlines digital workflows.", icon: Send,        accent: "#8B5CF6", tag: "Marketing",   href: "/work#zentap" },
      { title: "Traded",        desc: "Trading platform with seamless investor UX.",              icon: TrendingUp,  accent: "#10B981", tag: "Fintech",     href: "/work#traded" },
      { title: "Go Outfitter",  desc: "Outdoor marketplace built to convert.",                    icon: ShoppingBag, accent: "#34D399", tag: "E-commerce",  href: "/work#gooutfitter" },
      { title: "Upcoming Events", desc: "Event staffing platform led end-to-end.",                icon: Calendar,    accent: "#F472B6", tag: "Events",      href: "/work#upcomingevents" },
      { title: "Cancelo.io",    desc: "Subscription management, simplified.",                     icon: CreditCard,  accent: "#FB7185", tag: "SaaS",        href: "/work#cancelo" },
      { title: "Assemble",      desc: "Collaborative workspace for remote teams.",                icon: Layers,      accent: "#818CF8", tag: "SaaS",        href: "/work#assemble" },
    ],
  },
  {
    label: "Services",
    headerTitle: "Our Services",
    headerSubtitle: "End-to-end engineering for ambitious teams.",
    footerText: "Need something custom?",
    footerCtaText: "Book a consult",
    footerCtaHref: "/schedule",
    viewAllHref: "/services",
    items: [
      { title: "Custom Software", desc: "Bespoke products engineered around your workflow.",   icon: Code2,      accent: "#7BB6FF", tag: "Engineering",    href: "/services/custom-software" },
      { title: "Web Development", desc: "Modern, performant web apps on a battle-tested stack.", icon: Globe,      accent: "#A78BFA", tag: "Frontend",       href: "/services/web-development" },
      { title: "Mobile Apps",     desc: "Native iOS, Android, and cross-platform experiences.", icon: Smartphone, accent: "#34D399", tag: "Mobile",         href: "/services/mobile-apps" },
      { title: "AI & Data",       desc: "ML pipelines, RAG systems, intelligent automation.",   icon: Sparkles,   accent: "#FCD34D", tag: "Intelligence",   href: "/services/ai-data" },
      { title: "Cloud & DevOps",  desc: "Resilient infra and zero-downtime deployments.",       icon: Cloud,      accent: "#60A5FA", tag: "Infrastructure", href: "/services/cloud-devops" },
      { title: "Product Design",  desc: "Human-centered UI/UX backed by research.",             icon: Palette,    accent: "#F472B6", tag: "Design",         href: "/services/product-design" },
    ],
  },
  {
    label: "Solutions",
    headerTitle: "Built for your industry",
    headerSubtitle: "Tailored expertise across regulated and high-growth sectors.",
    footerText: "Don't see your industry?",
    footerCtaText: "Get in touch",
    footerCtaHref: "/schedule",
    viewAllHref: "/solutions",
    items: [
      { title: "SaaS & Startups",         desc: "From MVP to scale, with engineering you can grow with.",   icon: Rocket,      accent: "#7BB6FF", tag: "Growth",     href: "/solutions#saas-startups" },
      { title: "Fintech & Banking",       desc: "Secure, compliant financial products and infrastructure.", icon: Wallet,      accent: "#34D399", tag: "Compliance", href: "/solutions#fintech-banking" },
      { title: "Healthcare & Med-Tech",   desc: "HIPAA-grade patient and provider experiences.",            icon: HeartPulse,  accent: "#F472B6", tag: "Regulated",  href: "/solutions#healthcare-medtech" },
      { title: "E-commerce & Retail",     desc: "Storefronts and platforms engineered to convert.",         icon: ShoppingBag, accent: "#FCD34D", tag: "Commerce",   href: "/solutions#ecommerce-retail" },
      { title: "Enterprise & SMB",        desc: "Internal tools, integrations, and custom workflows.",      icon: Building2,   accent: "#A78BFA", tag: "Enterprise", href: "/solutions#enterprise-smb" },
      { title: "Marketplaces & Platforms", desc: "Multi-sided platforms that thrive at scale.",             icon: Layers,      accent: "#60A5FA", tag: "Platforms",  href: "/solutions#marketplaces-platforms" },
    ],
  },
  {
    label: "Blog",
    simpleHref: "/resources",
    align: "right",
  },
  {
    label: "Company",
    align: "right",
    headerTitle: "About Igknight",
    headerSubtitle: "Who we are, how we work, and where we're headed.",
    footerText: "Want to chat?",
    footerCtaText: "Schedule a meeting",
    footerCtaHref: "/schedule",
    viewAllHref: "/",
    items: [
      { title: "About",         desc: "Our story, mission, and how we work.",       icon: Building,        accent: "#7BB6FF", tag: "Story",      href: "/#about" },
      { title: "Careers",       desc: "Open roles across engineering and design.",  icon: Briefcase,       accent: "#FCD34D", tag: "Hiring",     href: "/careers", badge: "12 open" },
      { title: "Our Process",   desc: "How we ship — clearly and on time.",         icon: Workflow,        accent: "#34D399", tag: "Method",     href: "/#process" },
      { title: "Trusted By",    desc: "Teams that already partner with us.",        icon: Users,           accent: "#A78BFA", tag: "Clients",    href: "/#trusted-by" },
      { title: "Testimonials",  desc: "What clients say about working with us.",    icon: Award,           accent: "#60A5FA", tag: "Voices",     href: "/#testimonials" },
      { title: "Contact",       desc: "Reach out — we read every message.",         icon: MessageCircle,   accent: "#F472B6", tag: "Reach us",   href: "/schedule" },
    ],
  },
];

/* ────────────── Navbar ────────────── */

type SessionUser = { name: string | null; email: string; image: string | null };

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [authResolved, setAuthResolved] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Resolve auth state once on mount + after the account panel closes (catches
  // login/logout transitions without forcing a page refresh).
  useEffect(() => {
    let cancelled = false;
    fetch("/api/me", { cache: "no-store" })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 401) {
          setUser(null);
        } else if (res.ok) {
          const { user: u } = (await res.json()) as { user: SessionUser };
          setUser(u);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setAuthResolved(true);
      });
    return () => {
      cancelled = true;
    };
  }, [accountOpen]);

  const openMenu = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 260);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="w-full bg-[#143A8E] border-b border-white/10 px-6 lg:px-10 flex items-center justify-between relative z-50 h-[64px]"
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Igknight Tech logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white font-bold text-[17px] tracking-tight">
            Igknight<span className="text-[#2783ED]">Tech</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden lg:flex items-center h-full gap-0.5">
          {navLinks.map((link) => {
            if (link.simpleHref) {
              return (
                <li key={link.label} className="relative h-full flex items-center">
                  <Link
                    href={link.simpleHref}
                    className="text-sm font-medium px-3.5 h-full inline-flex items-center text-[#a8bee0] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }
            return (
              <li
                key={link.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => openMenu(link.label)}
                onMouseLeave={closeMenu}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium px-3.5 h-full transition-all duration-200 ${
                    activeMenu === link.label
                      ? "text-white"
                      : "text-[#a8bee0] hover:text-white"
                  }`}
                  aria-expanded={activeMenu === link.label}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      activeMenu === link.label
                        ? "rotate-180 text-[#2783ED]"
                        : "opacity-60"
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-full pt-3 transition-all duration-300 ease-out ${
                    link.align === "right"
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2"
                  } ${
                    activeMenu === link.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                  onMouseEnter={() => openMenu(link.label)}
                  onMouseLeave={closeMenu}
                >
                  <MegaDropdown link={link} />
                </div>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop CTAs ── */}
        <div className="hidden lg:flex items-center gap-2.5">
          <AuthSlot
            user={user}
            authResolved={authResolved}
            onOpen={() => setAccountOpen(true)}
          />
          <Link
            href="/schedule"
            className="bg-[#2783ED] hover:bg-[#1A6FD9] text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-[0_0_20px_rgba(39,131,237,0.3)] hover:shadow-[0_0_28px_rgba(39,131,237,0.5)]"
          >
            Schedule a Meeting
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute top-[64px] left-0 right-0 bottom-0 bg-[#143A8E] overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.simpleHref) {
                return (
                  <Link
                    key={link.label}
                    href={link.simpleHref}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3.5 text-[#d6e3f9] hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
              <div key={link.label} className="rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3.5 text-[#d6e3f9] hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm"
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                  }
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileExpanded === link.label
                        ? "rotate-180 text-[#2783ED]"
                        : "opacity-50"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileExpanded === link.label
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-[#1D3275] rounded-xl mx-1 mb-1 p-2 grid grid-cols-2 gap-1">
                    {(link.items ?? []).map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-start gap-2.5 p-3 rounded-lg hover:bg-white/[0.06] transition-colors text-left"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.08] flex-shrink-0"
                            style={{ background: `${item.accent}18` }}
                          >
                            <Icon
                              className="w-4 h-4"
                              style={{ color: item.accent }}
                              strokeWidth={1.9}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <div className="text-white text-xs font-semibold truncate">
                                {item.title}
                              </div>
                              {item.badge && (
                                <span className="text-[8px] font-bold uppercase tracking-wider bg-[#2783ED]/20 text-[#7BB6FF] px-1 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[#88a0c6] text-[11px] mt-0.5 leading-snug line-clamp-2">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              );
            })}

            {/* Mobile CTAs */}
            <div className="mt-4 flex flex-col gap-3 px-1 pb-8">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setAccountOpen(true);
                }}
                className="w-full py-3 rounded-xl border border-white/10 text-[#d6e3f9] text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                {user ? (
                  <>
                    <MobileAvatarMini name={user.name} image={user.image} />
                    <span className="truncate max-w-[180px]">
                      {user.name || user.email}
                    </span>
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
              <Link
                href="/schedule"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 rounded-xl bg-[#2783ED] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(39,131,237,0.3)]"
              >
                Schedule a Meeting
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AccountPanel open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Auth slot (desktop)                                         */
/* ─────────────────────────────────────────────────────────── */
function AuthSlot({
  user,
  authResolved,
  onOpen,
}: {
  user: SessionUser | null;
  authResolved: boolean;
  onOpen: () => void;
}) {
  // Reserve a stable button-sized slot so the layout doesn't shift while auth
  // resolves. The button just swaps its content the moment we know.
  if (!authResolved) {
    return (
      <div className="h-9 w-[88px] rounded-lg bg-white/[0.04] animate-pulse" />
    );
  }
  if (!user) {
    return (
      <button
        onClick={onOpen}
        className="text-[#a8bee0] hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-200"
      >
        Sign in
      </button>
    );
  }
  return (
    <button
      onClick={onOpen}
      aria-label="Open account"
      className="group flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/[0.04] transition-colors"
    >
      <NavAvatar name={user.name} image={user.image} />
      <span className="text-white/90 group-hover:text-white text-[12.5px] font-medium tracking-tight truncate max-w-[120px]">
        {firstName(user.name) || user.email}
      </span>
    </button>
  );
}

function NavAvatar({
  name,
  image,
}: {
  name: string | null;
  image: string | null;
}) {
  const [errored, setErrored] = useState(false);
  if (image && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setErrored(true)}
        className="w-7 h-7 rounded-full object-cover border border-white/20"
      />
    );
  }
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
      style={{
        background: "linear-gradient(135deg, #2783ED 0%, #8B5CF6 100%)",
      }}
    >
      {initialsFor(name)}
    </div>
  );
}

function MobileAvatarMini({
  name,
  image,
}: {
  name: string | null;
  image: string | null;
}) {
  const [errored, setErrored] = useState(false);
  if (image && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setErrored(true)}
        className="w-6 h-6 rounded-full object-cover border border-white/20"
      />
    );
  }
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
      style={{
        background: "linear-gradient(135deg, #2783ED 0%, #8B5CF6 100%)",
      }}
    >
      {initialsFor(name)}
    </div>
  );
}

function firstName(name: string | null): string {
  return (name ?? "").trim().split(/\s+/)[0] ?? "";
}

function initialsFor(name: string | null): string {
  const n = (name ?? "").trim();
  if (!n) return "•";
  const parts = n.split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "•";
}

/* ─────────────────────────────────────────────────────────── */
/*  Generalized Mega dropdown                                   */
/* ─────────────────────────────────────────────────────────── */
function MegaDropdown({ link }: { link: NavLink }) {
  return (
    <div className="w-[680px] xl:w-[760px] max-w-[calc(100vw-2rem)] bg-[#1B49A8] border border-white/10 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-xl">

      {/* Header bar */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="min-w-0">
          <div className="text-white text-[13px] font-semibold tracking-tight">
            {link.headerTitle}
          </div>
          <div className="text-[#88a0c6] text-[11px] mt-0.5 truncate">
            {link.headerSubtitle}
          </div>
        </div>
        {link.viewAllHref ? (
          <Link
            href={link.viewAllHref}
            className="group flex-shrink-0 flex items-center gap-1 text-[#2783ED] text-[10px] font-bold uppercase tracking-[0.18em] hover:gap-1.5 transition-all"
          >
            View all
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ) : null}
      </div>

      {/* Items grid */}
      <div className="p-3 grid grid-cols-3 gap-1">
        {(link.items ?? []).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex flex-col gap-3 p-3.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 text-left overflow-hidden"
            >
              {/* Corner accent halo on hover */}
              <div
                className="absolute -top-px -right-px w-28 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${item.accent}28, transparent 65%)`,
                }}
              />

              {/* Top edge accent line on hover */}
              <div
                className="absolute top-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                }}
              />

              {/* Icon + arrow */}
              <div className="relative flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.08] group-hover:border-white/15 transition-colors duration-300"
                  style={{ background: `${item.accent}18` }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: item.accent }}
                    strokeWidth={1.8}
                  />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/0 group-hover:text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Title + badge + desc */}
              <div className="relative">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-white text-[13px] font-semibold tracking-tight leading-tight">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span
                      className="text-[8.5px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-full border"
                      style={{
                        color: item.accent,
                        background: `${item.accent}15`,
                        borderColor: `${item.accent}40`,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-[#88a0c6] text-[11px] mt-1.5 leading-snug">
                  {item.desc}
                </div>
              </div>

              {/* Tag pill */}
              <div className="relative mt-auto pt-1">
                <span
                  className="inline-block text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border transition-colors duration-300"
                  style={{
                    color: item.accent,
                    background: `${item.accent}10`,
                    borderColor: `${item.accent}28`,
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-white/[0.06] px-5 py-3.5 flex items-center justify-between gap-3 bg-gradient-to-t from-white/[0.04] to-transparent">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-[#2783ED] flex-shrink-0" />
          <span className="text-[#d6e3f9] text-xs truncate">
            {link.footerText}
          </span>
        </div>
        <Link
          href={link.footerCtaHref ?? "/schedule"}
          className="group flex-shrink-0 flex items-center gap-1.5 text-white text-xs font-semibold bg-[#2783ED] hover:bg-[#1A6FD9] px-3.5 py-1.5 rounded-lg transition-all duration-200 shadow-[0_0_16px_rgba(39,131,237,0.3)] hover:shadow-[0_0_24px_rgba(39,131,237,0.5)]"
        >
          {link.footerCtaText}
          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
