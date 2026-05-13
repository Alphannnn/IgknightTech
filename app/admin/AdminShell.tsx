"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarX,
  Newspaper,
  Briefcase,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Search,
  Command,
  type LucideIcon,
} from "lucide-react";
import { logoutAction } from "./actions";
import CommandPalette from "./CommandPalette";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  /** Key in the `badges` prop. */
  badge?: "pending" | "drafts" | "hiddenRoles";
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const SECTIONS: NavSection[] = [
  {
    label: "Operations",
    items: [
      { href: "/admin",              label: "Dashboard",    icon: LayoutDashboard, exact: true },
      { href: "/admin/meetings",     label: "Meetings",     icon: CalendarCheck, badge: "pending" },
      { href: "/admin/availability", label: "Availability", icon: CalendarX },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog",     label: "Blog",     icon: Newspaper, badge: "drafts" },
      { href: "/admin/careers",  label: "Careers",  icon: Briefcase, badge: "hiddenRoles" },
    ],
  },
];

export type SidebarBadges = {
  pending?: number;
  drafts?: number;
  hiddenRoles?: number;
};

export default function AdminShell({
  children,
  badges = {},
}: {
  children: React.ReactNode;
  badges?: SidebarBadges;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    // Mac vs Windows/Linux affects the ⌘ / Ctrl glyph in the hint.
    // Syncing from navigator — an external system. Intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(typeof navigator !== "undefined" && /mac/i.test(navigator.platform));
  }, []);

  const openPalette = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("admin:cmd-open"));
    }
  };

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");

  const allItems = SECTIONS.flatMap((s) => s.items);
  const currentItem = allItems.find((i) => isActive(i));
  const currentLabel = currentItem?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-[#F7F8FB] flex">

      {/* ─────────── Sidebar ─────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-[#0A1635] border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.06]">
          <Link
            href="/admin"
            className="group flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <span
              aria-hidden="true"
              className="relative w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7BB6FF, #4f9ef8 60%, #3a8ef0)",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.25) inset, 0 6px 16px -4px rgba(79,158,248,0.6)",
              }}
            >
              <span className="relative">I</span>
              {/* sheen on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                }}
              />
            </span>
            <div className="leading-tight">
              <div className="text-white text-[13px] font-bold tracking-tight">
                Igknight<span className="text-[#7BB6FF]">Tech</span>
              </div>
              <div className="text-blue-200/45 text-[10px] font-bold uppercase tracking-[0.18em]">
                Admin
              </div>
            </div>
          </Link>
          <button
            className="lg:hidden text-blue-100/70 hover:text-white p-1.5 rounded-md hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="px-3 mb-2 flex items-center gap-2">
                <span className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-blue-200/35">
                  {section.label}
                </span>
                <span className="h-px flex-1 bg-white/[0.06]" />
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);
                  const badgeValue = item.badge ? badges[item.badge] ?? 0 : 0;
                  const showBadge = item.badge && badgeValue > 0;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          active
                            ? "text-white"
                            : "text-blue-100/65 hover:text-white"
                        }`}
                      >
                        {/* Active background glow */}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                            active
                              ? "opacity-100 bg-gradient-to-r from-[#7BB6FF]/12 via-white/[0.04] to-transparent"
                              : "opacity-0 group-hover:opacity-60 bg-white/[0.04]"
                          }`}
                        />
                        {/* Active left accent bar */}
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full transition-all duration-300 ${
                            active ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ background: "#7BB6FF", boxShadow: "0 0 12px rgba(123,182,255,0.7)" }}
                        />
                        <Icon
                          className={`relative w-4 h-4 flex-shrink-0 transition-colors ${
                            active ? "text-[#7BB6FF]" : "text-blue-100/45 group-hover:text-blue-100/85"
                          }`}
                          strokeWidth={1.9}
                        />
                        <span className="relative flex-1 truncate">{item.label}</span>
                        {showBadge && (
                          <span
                            aria-hidden="true"
                            className={`relative inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold tabular-nums transition-all ${
                              active
                                ? "bg-[#7BB6FF] text-[#0A1635]"
                                : "bg-white/[0.08] text-blue-100/80"
                            }`}
                          >
                            {badgeValue}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="border-t border-white/[0.06] p-3 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-blue-100/65 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            <ExternalLink className="w-4 h-4 text-blue-100/45 group-hover:text-blue-100/85" strokeWidth={1.9} />
            <span className="flex-1">View site</span>
          </Link>
          <form action={logoutAction} data-admin-logout-form>
            <button
              type="submit"
              className="group w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-blue-100/65 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <LogOut className="w-4 h-4 text-blue-100/45 group-hover:text-red-300 transition-colors" strokeWidth={1.9} />
              <span className="flex-1 text-left">Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─────────── Main content ─────────── */}
      <div className="flex-1 min-w-0 lg:pl-[260px]">

        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/70">
          <div className="h-full flex items-center justify-between px-5 sm:px-7">

            {/* Left: mobile menu + breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="lg:hidden text-slate-500 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium min-w-0">
                <Link href="/admin" className="text-slate-400 hover:text-slate-700 transition-colors shrink-0">
                  Admin
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span className="text-slate-900 font-bold tracking-tight truncate">
                  {currentLabel}
                </span>
              </nav>
            </div>

            {/* Right: working search button + view-site shortcut */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openPalette}
                title="Open command palette"
                aria-label="Open command palette"
                className="hidden md:inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Search…</span>
                <kbd
                  suppressHydrationWarning
                  className="inline-flex items-center gap-0.5 h-5 px-1.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-mono font-semibold text-slate-500"
                >
                  {isMac ? (
                    <>
                      <Command className="w-2.5 h-2.5" />K
                    </>
                  ) : (
                    "Ctrl K"
                  )}
                </kbd>
              </button>
              <button
                type="button"
                onClick={openPalette}
                className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Open command palette"
              >
                <Search className="w-4 h-4" />
              </button>
              <Link
                href="/"
                target="_blank"
                title="View public site"
                aria-label="View public site"
                className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>

        <main className="px-5 sm:px-7 lg:px-10 py-8 sm:py-10">
          {children}
        </main>
      </div>

      {/* Real ⌘K command palette. Listens globally for the shortcut and for
          the "admin:cmd-open" event dispatched by the search button above. */}
      <CommandPalette />
    </div>
  );
}
