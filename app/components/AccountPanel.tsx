"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  X,
  Calendar,
  Clock,
  LogOut,
  ArrowRight,
  CalendarPlus,
  CheckCircle2,
  Loader2,
  Sparkles,
  Building2,
  Zap,
  Briefcase,
  Code2,
  MessageSquare,
  User as UserIcon,
  Mail,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

type MeetingDTO = {
  id: string;
  meetingType: string;
  date: string; // ISO from API
  timeSlot: string;
  status: string;
  company: string | null;
  message: string | null;
  createdAt: string;
  updatedAt: string;
};

type MePayload = {
  user: { name: string | null; email: string; image: string | null };
  meetings: MeetingDTO[];
};

const STATUS: Record<
  string,
  { label: string; dot: string; pill: string; text: string }
> = {
  pending:   { label: "Pending",   dot: "bg-amber-500",   pill: "bg-amber-50 border-amber-200",     text: "text-amber-700"   },
  confirmed: { label: "Confirmed", dot: "bg-emerald-500", pill: "bg-emerald-50 border-emerald-200", text: "text-emerald-700" },
  completed: { label: "Completed", dot: "bg-blue-500",    pill: "bg-blue-50 border-blue-200",       text: "text-blue-700"    },
  cancelled: { label: "Cancelled", dot: "bg-slate-400",   pill: "bg-slate-100 border-slate-200",    text: "text-slate-500"   },
};

const TYPE_META: Record<string, { label: string; color: string; icon: LucideIcon }> = {
  discovery:    { label: "Discovery",    color: "#7BB6FF", icon: Zap },
  consultation: { label: "Consultation", color: "#A78BFA", icon: Briefcase },
  technical:    { label: "Technical",    color: "#34D399", icon: Code2 },
  general:      { label: "General",      color: "#F472B6", icon: MessageSquare },
};

const POLL_MS = 8000;

export default function AccountPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const [data, setData] = useState<MePayload | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(false);

  // Fetch on open + poll while open so status changes from admin appear live.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function tick(showSpinner: boolean) {
      if (cancelled || inFlight.current) return;
      inFlight.current = true;
      if (showSpinner) setLoading(true);
      try {
        const res = await fetch("/api/me/meetings", { cache: "no-store" });
        if (cancelled) return;
        if (res.status === 401) {
          setSignedIn(false);
          setData(null);
          return;
        }
        if (!res.ok) return;
        const json = (await res.json()) as MePayload;
        if (cancelled) return;
        setSignedIn(true);
        setData(json);
      } catch {
        // ignore
      } finally {
        inFlight.current = false;
        if (showSpinner) setLoading(false);
      }
    }

    function loop() {
      if (cancelled || document.hidden) return;
      timer = setTimeout(async () => {
        await tick(false);
        loop();
      }, POLL_MS);
    }

    tick(true).then(loop);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [open]);

  // Close on ESC + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const meetings = data?.meetings ?? [];
  const upcoming = useMemo(
    () => meetings.filter((m) => m.status !== "cancelled" && m.status !== "completed"),
    [meetings],
  );
  const past = useMemo(
    () => meetings.filter((m) => m.status === "cancelled" || m.status === "completed"),
    [meetings],
  );

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Account"
        className={`absolute right-0 top-0 bottom-0 w-full sm:w-[440px] bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.4)] flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top sheen */}
        <span
          aria-hidden="true"
          className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#2783ED]/40 to-transparent"
        />

        {/* Header */}
        <header className="px-6 pt-6 pb-5 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <Sparkles className="w-3 h-3 text-[#2783ED]" />
              Account
            </div>
            <h2 className="mt-1 text-slate-900 text-[1.4rem] font-extrabold tracking-tight leading-tight">
              {signedIn ? "Your meetings" : "Sign in"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="w-9 h-9 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {signedIn === null || (loading && !data) ? (
            <PanelSkeleton />
          ) : signedIn === false ? (
            <SignedOut
              onSignedIn={async () => {
                // Refetch session + meetings so the panel flips to signed-in,
                // and refresh server components so /schedule + nav see the user.
                router.refresh();
                try {
                  const res = await fetch("/api/me/meetings", { cache: "no-store" });
                  if (res.ok) {
                    const json = (await res.json()) as MePayload;
                    setSignedIn(true);
                    setData(json);
                  }
                } catch {
                  // ignore
                }
              }}
            />
          ) : (
            <SignedIn
              user={data!.user}
              upcoming={upcoming}
              past={past}
              onLogout={async () => {
                await fetch(`/api/auth/logout?next=${encodeURIComponent(pathname)}`, {
                  method: "POST",
                  redirect: "manual",
                });
                setSignedIn(false);
                setData(null);
                router.refresh();
              }}
              onClose={onClose}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

/* ───────────────────────── Signed-out state ───────────────────────── */

function SignedOut({ onSignedIn }: { onSignedIn: () => void | Promise<void> }) {
  return (
    <div className="px-6 py-8 flex flex-col items-center text-center">
      {/* Glow halo */}
      <div className="relative w-16 h-16 mb-5">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full blur-2xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, #2783ED 0%, #8B5CF6 50%, transparent 75%)",
          }}
        />
        <div className="relative w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(15,23,42,0.18)]">
          <CalendarPlus className="w-7 h-7 text-[#2783ED]" strokeWidth={1.6} />
        </div>
      </div>

      <h3 className="text-slate-900 text-lg font-bold tracking-tight">
        Sign in to manage meetings
      </h3>
      <p className="mt-2 text-slate-500 text-sm leading-relaxed max-w-[320px]">
        Just your name and email — no password required.
      </p>

      <SignInForm className="mt-6 w-full max-w-[320px]" onSignedIn={onSignedIn} />
    </div>
  );
}

/* ───────────────────────── Sign-in form (shared) ───────────────────────── */

export function SignInForm({
  className,
  onSignedIn,
}: {
  className?: string;
  onSignedIn: () => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Sign-in failed. Try again.");
        setSubmitting(false);
        return;
      }
      await onSignedIn();
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="space-y-2.5 text-left">
        <label className="block">
          <span className="flex items-center gap-1.5 text-slate-700 text-[12px] font-semibold mb-1.5">
            <UserIcon className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            Name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            required
            autoComplete="name"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/[0.05] transition-all"
          />
        </label>
        <label className="block">
          <span className="flex items-center gap-1.5 text-slate-700 text-[12px] font-semibold mb-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            required
            autoComplete="email"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/[0.05] transition-all"
          />
        </label>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-600">
          <AlertCircle className="w-3.5 h-3.5" strokeWidth={2.2} />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !name.trim() || !email.trim()}
        className="mt-4 group inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors shadow-[0_10px_30px_-12px_rgba(15,23,42,0.45)]"
      >
        {submitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Continue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

/* ───────────────────────── Signed-in state ───────────────────────── */

function SignedIn({
  user,
  upcoming,
  past,
  onLogout,
  onClose,
}: {
  user: { name: string | null; email: string; image: string | null };
  upcoming: MeetingDTO[];
  past: MeetingDTO[];
  onLogout: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* Profile card */}
      <div className="px-6 pt-5 pb-5">
        <div className="relative rounded-2xl p-[1px] overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl opacity-90"
            style={{
              background:
                "linear-gradient(135deg, #2783ED 0%, #8B5CF6 50%, #22D3EE 100%)",
            }}
          />
          <div className="relative rounded-[15px] bg-white p-4 flex items-center gap-4">
            <Avatar name={user.name} image={user.image} />
            <div className="min-w-0 flex-1">
              <div className="text-slate-900 font-bold tracking-tight truncate text-[15px]">
                {user.name || "Friend"}
              </div>
              <div className="text-slate-500 text-[12px] truncate">{user.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meetings */}
      <div className="px-6">
        <Section title="Upcoming" count={upcoming.length}>
          {upcoming.length === 0 ? (
            <EmptyMeetings
              message="No upcoming meetings."
              hint="Book one and it'll show up here."
            />
          ) : (
            <ul className="space-y-2.5">
              {upcoming.map((m) => (
                <MeetingItem key={m.id} m={m} />
              ))}
            </ul>
          )}
        </Section>

        {past.length > 0 && (
          <Section title="Past" count={past.length}>
            <ul className="space-y-2.5">
              {past.map((m) => (
                <MeetingItem key={m.id} m={m} />
              ))}
            </ul>
          </Section>
        )}
      </div>

      {/* Sticky footer with CTAs */}
      <div className="mt-2 px-6 py-4 border-t border-slate-100 flex items-center gap-2 sticky bottom-0 bg-white">
        <Link
          href="/schedule"
          onClick={onClose}
          className="flex-1 group inline-flex items-center justify-center gap-1.5 h-11 rounded-xl bg-[#2783ED] hover:bg-[#1A6FD9] text-white font-semibold text-sm transition-all shadow-[0_8px_22px_-10px_rgba(39,131,237,0.7)] hover:shadow-[0_10px_26px_-8px_rgba(39,131,237,0.8)]"
        >
          Book a meeting
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <button
          onClick={onLogout}
          aria-label="Sign out"
          title="Sign out"
          className="h-11 px-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors inline-flex items-center justify-center"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── Bits ───────────────────────── */

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-5">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-slate-900 text-[13px] font-bold tracking-tight">
          {title}
        </h3>
        <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
          {count}
        </span>
      </div>
      {children}
    </section>
  );
}

function MeetingItem({ m }: { m: MeetingDTO }) {
  const s = STATUS[m.status] ?? STATUS.pending;
  const t = TYPE_META[m.meetingType] ?? {
    label: m.meetingType,
    color: "#94a3b8",
    icon: Calendar,
  };
  const TIcon = t.icon;
  const date = new Date(m.date);
  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <li
      className="group relative rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all p-3.5 overflow-hidden"
    >
      {/* Accent rail on hover */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300"
        style={{ background: t.color }}
      />

      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
          style={{ background: `${t.color}14`, borderColor: `${t.color}30` }}
        >
          <TIcon className="w-4 h-4" style={{ color: t.color }} strokeWidth={1.9} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-900 text-[13px] font-bold tracking-tight">
              {t.label}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-full border ${s.pill} ${s.text}`}
            >
              <span aria-hidden="true" className={`w-1 h-1 rounded-full ${s.dot}`} />
              {s.label}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-x-3 gap-y-0.5 flex-wrap text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {dateLabel}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {m.timeSlot}
            </span>
            {m.company && (
              <span className="inline-flex items-center gap-1 truncate max-w-[160px]">
                <Building2 className="w-3 h-3" />
                {m.company}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

function EmptyMeetings({ message, hint }: { message: string; hint: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center">
      <div className="mx-auto w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-2.5">
        <CheckCircle2 className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
      </div>
      <p className="text-slate-900 text-[13px] font-semibold">{message}</p>
      <p className="text-slate-500 text-[11px] mt-0.5">{hint}</p>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="px-6 py-8 flex items-center justify-center text-slate-400">
      <Loader2 className="w-5 h-5 animate-spin" />
    </div>
  );
}

function Avatar({ name, image }: { name: string | null; image: string | null }) {
  const [errored, setErrored] = useState(false);
  const initials = useMemo(() => {
    const n = (name ?? "").trim();
    if (!n) return "•";
    const parts = n.split(/\s+/);
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "•";
  }, [name]);

  if (image && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "Profile"}
        referrerPolicy="no-referrer"
        onError={() => setErrored(true)}
        className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
      />
    );
  }
  return (
    <div
      className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold tracking-tight"
      style={{
        background: "linear-gradient(135deg, #2783ED 0%, #8B5CF6 100%)",
      }}
    >
      {initials}
    </div>
  );
}

