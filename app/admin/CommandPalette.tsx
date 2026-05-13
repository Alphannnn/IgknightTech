"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarX,
  Newspaper,
  Briefcase,
  Plus,
  ExternalLink,
  LogOut,
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Command,
  type LucideIcon,
} from "lucide-react";

type CmdItem = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Create" | "Account";
  icon: LucideIcon;
  /** Either a route to navigate to, or a custom action. */
  href?: string;
  external?: boolean;
  /** Custom action — e.g. submitting the logout form. */
  action?: () => void;
};

/**
 * Real ⌘K command palette. Opens with Cmd/Ctrl + K, closes with Esc,
 * navigates with arrow keys, Enter activates. All routes are real.
 *
 * The "Sign out" item programmatically submits the existing logout
 * <form action={logoutAction}> in the sidebar — no parallel logic path.
 */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: CmdItem[] = useMemo(
    () => [
      { id: "nav-dashboard",    label: "Dashboard",           hint: "Overview",                       group: "Navigate", icon: LayoutDashboard, href: "/admin" },
      { id: "nav-meetings",     label: "Meetings",            hint: "Bookings from /schedule",        group: "Navigate", icon: CalendarCheck,   href: "/admin/meetings" },
      { id: "nav-availability", label: "Availability",        hint: "Open or block days",             group: "Navigate", icon: CalendarX,       href: "/admin/availability" },
      { id: "nav-blog",         label: "Blog",                hint: "Write and publish articles",     group: "Navigate", icon: Newspaper,       href: "/admin/blog" },
      { id: "nav-careers",      label: "Careers",             hint: "Open roles",                     group: "Navigate", icon: Briefcase,       href: "/admin/careers" },
      { id: "new-post",         label: "New blog post",       hint: "Draft an article",               group: "Create",   icon: Plus,            href: "/admin/blog/new" },
      { id: "new-role",         label: "New career role",     hint: "Open a position",                group: "Create",   icon: Plus,            href: "/admin/careers/new" },
      { id: "view-site",        label: "View public site",    hint: "Opens in a new tab",             group: "Account",  icon: ExternalLink,    href: "/", external: true },
      {
        id: "sign-out",
        label: "Sign out",
        hint: "End admin session",
        group: "Account",
        icon: LogOut,
        action: () => {
          // Submit the existing logout form rendered by AdminShell.
          const form = document.querySelector<HTMLFormElement>(
            "form[data-admin-logout-form]"
          );
          if (form) form.requestSubmit();
        },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.hint ?? ""}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  const groups = useMemo(() => {
    const out: Record<string, CmdItem[]> = {};
    for (const it of filtered) {
      (out[it.group] ??= []).push(it);
    }
    return out;
  }, [filtered]);

  // Flat list mirrors the visible order — that's what arrow-keys traverse.
  const flat = useMemo(() => {
    return (["Navigate", "Create", "Account"] as const).flatMap((g) =>
      groups[g] ?? []
    );
  }, [groups]);

  // Global keybinding: Cmd/Ctrl + K toggles. Esc closes.
  // Also listens for "admin:cmd-open" so the topbar button can open it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("admin:cmd-open", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("admin:cmd-open", onOpenEvent);
    };
  }, [open]);

  // Refocus input + reset state on open. Syncing UI state off the
  // "open" external event — intentional.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setActiveIndex(0);
      // Defer focus to allow modal to mount.
      const t = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Clamp active index when filtered length changes — keep the highlight
  // valid after the visible list size changes due to typed input.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex((i) => Math.max(0, Math.min(i, flat.length - 1)));
  }, [flat.length]);

  // Scroll active item into view.
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-cmd-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const activate = (item: CmdItem) => {
    setOpen(false);
    if (item.action) {
      item.action();
      return;
    }
    if (!item.href) return;
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(item.href);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(flat.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[activeIndex];
      if (item) activate(item);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4"
    >
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm admin-cmd-backdrop-enter"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.4)] overflow-hidden admin-cmd-enter">

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent outline-none text-slate-900 text-sm placeholder:text-slate-400"
            aria-label="Command palette search"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 h-6 px-1.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-mono font-semibold text-slate-500">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
          {flat.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-slate-500">
              No matches. Try a different search.
            </div>
          ) : (
            (["Navigate", "Create", "Account"] as const).map((g) => {
              const list = groups[g];
              if (!list || list.length === 0) return null;
              return (
                <div key={g} className="px-2 pb-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {g}
                  </div>
                  <ul>
                    {list.map((item) => {
                      const idx = flat.indexOf(item);
                      const active = idx === activeIndex;
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            data-cmd-index={idx}
                            type="button"
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => activate(item)}
                            className={`group w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                              active ? "bg-slate-100" : "hover:bg-slate-50"
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-md flex items-center justify-center border ${
                                active
                                  ? "bg-white border-slate-200"
                                  : "bg-slate-50 border-slate-200"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5 text-slate-600" strokeWidth={1.9} />
                            </span>
                            <span className="flex-1 min-w-0">
                              <div className="text-slate-900 text-sm font-semibold truncate">
                                {item.label}
                              </div>
                              {item.hint && (
                                <div className="text-slate-500 text-xs truncate">
                                  {item.hint}
                                </div>
                              )}
                            </span>
                            {active && (
                              <CornerDownLeft className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        {/* Footer key hints */}
        <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-200 bg-slate-50">
                <ArrowUp className="w-2.5 h-2.5" />
              </kbd>
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-200 bg-slate-50">
                <ArrowDown className="w-2.5 h-2.5" />
              </kbd>
              <span className="ml-0.5">to navigate</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-slate-200 bg-slate-50 font-mono">
                ↵
              </kbd>
              <span className="ml-0.5">to select</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-slate-200 bg-slate-50 font-mono">
              <Command className="w-2.5 h-2.5" />
            </kbd>
            <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-slate-200 bg-slate-50 font-mono">
              K
            </kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
