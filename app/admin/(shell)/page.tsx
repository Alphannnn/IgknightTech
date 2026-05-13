import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import AnimatedNumber from "../AnimatedNumber";
import Greeting from "../Greeting";
import {
  CalendarCheck,
  Clock,
  CalendarRange,
  CalendarX,
  ArrowUpRight,
  ArrowRight,
  Newspaper,
  Briefcase,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  CircleDot,
  Activity,
  FileEdit,
  FilePlus,
  UserPlus,
  UserCog,
  CalendarPlus,
} from "lucide-react";

/* ────────────────────── Time helpers ────────────────────── */

function startOfTodayUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function dayKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

/** "2m ago", "3h ago", "4d ago" — snapshot at render time. */
function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 45) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

/** Friendly day label: "Today", "Tomorrow", or "Wed, May 14". */
function friendlyDay(d: Date): string {
  const today = startOfTodayUTC();
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const k = dayKey(d);
  if (k === dayKey(today)) return "Today";
  if (k === dayKey(tomorrow)) return "Tomorrow";
  return d.toUTCString().slice(0, 11).trim(); // "Wed, 14 May"
}

const STATUS_STYLES: Record<string, { label: string; bg: string; text: string; dot: string; hex: string }> = {
  pending:   { label: "Pending",   bg: "bg-amber-50 border-amber-200",     text: "text-amber-700",   dot: "bg-amber-500",   hex: "#F59E0B" },
  confirmed: { label: "Confirmed", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500", hex: "#10B981" },
  completed: { label: "Completed", bg: "bg-blue-50 border-blue-200",       text: "text-blue-700",    dot: "bg-blue-500",    hex: "#4f9ef8" },
  cancelled: { label: "Cancelled", bg: "bg-slate-100 border-slate-200",    text: "text-slate-500",   dot: "bg-slate-400",   hex: "#94a3b8" },
};

/* ────────────────────── Dashboard ────────────────────── */

export default async function AdminDashboardPage() {
  await requireAdmin();

  const today = startOfTodayUTC();
  const weekEnd = new Date(today);
  weekEnd.setUTCDate(today.getUTCDate() + 7);
  const fourteenDaysAgo = new Date(today);
  fourteenDaysAgo.setUTCDate(today.getUTCDate() - 13);
  const lastWeekStart = new Date(today);
  lastWeekStart.setUTCDate(today.getUTCDate() - 7);
  const heatmapStart = new Date(today);
  heatmapStart.setUTCDate(today.getUTCDate() - (12 * 7 - 1));

  const [
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    thisWeek,
    lastWeek,
    blocked,
    upNext,
    weekMeetings,
    series,
    heatmapMeetings,
    postsPublished,
    postsDrafts,
    rolesActive,
    rolesHidden,
    recentMeetings,
    recentPosts,
    recentRoles,
  ] = await Promise.all([
    db.meeting.count(),
    db.meeting.count({ where: { status: "pending" } }),
    db.meeting.count({ where: { status: "confirmed" } }),
    db.meeting.count({ where: { status: "completed" } }),
    db.meeting.count({ where: { status: "cancelled" } }),
    db.meeting.count({ where: { date: { gte: today, lt: weekEnd } } }),
    db.meeting.count({ where: { date: { gte: lastWeekStart, lt: today } } }),
    db.availabilityOverride.count(),
    // Up-next: the next confirmed meeting from today onwards
    db.meeting.findFirst({
      where: { status: "confirmed", date: { gte: today } },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
    }),
    // This week's confirmed/pending meetings, sorted by date ascending
    db.meeting.findMany({
      where: {
        date: { gte: today, lt: weekEnd },
        status: { in: ["confirmed", "pending"] },
      },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
      take: 6,
    }),
    db.meeting.findMany({
      where: { date: { gte: fourteenDaysAgo } },
      select: { date: true },
    }),
    db.meeting.findMany({
      where: { date: { gte: heatmapStart } },
      select: { date: true },
    }),
    db.blogPost.count({ where: { status: "published" } }),
    db.blogPost.count({ where: { status: "draft" } }),
    db.careerRole.count({ where: { active: true } }),
    db.careerRole.count({ where: { active: false } }),
    db.meeting.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, company: true, status: true, createdAt: true },
    }),
    db.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, slug: true, title: true, status: true, createdAt: true, updatedAt: true },
    }),
    db.careerRole.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, active: true, createdAt: true, updatedAt: true },
    }),
  ]);

  const dailySeries = bucket14Days(series, today);
  const heatmap = bucketHeatmap(heatmapMeetings, today);

  const activity = buildActivity(recentMeetings, recentPosts, recentRoles);

  return (
    <div className="admin-page-in space-y-7">

      {/* ─────────────── Hero ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">

        {/* Greeting */}
        <div className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-16 w-64 h-64 rounded-full opacity-[0.10] blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #4f9ef8, transparent 70%)" }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <h1 className="mt-3 text-slate-900 text-[2rem] sm:text-[2.4rem] font-extrabold tracking-tight leading-[1.05]">
              <Greeting />
            </h1>
            <p className="mt-2 text-slate-500 text-sm sm:text-[15px] leading-relaxed max-w-lg">
              {pending > 0
                ? `${pending} meeting${pending === 1 ? "" : "s"} waiting on you${postsDrafts > 0 ? `, ${postsDrafts} draft${postsDrafts === 1 ? "" : "s"} in the blog.` : "."}`
                : postsDrafts > 0
                  ? `Inbox is clear. ${postsDrafts} draft${postsDrafts === 1 ? "" : "s"} sitting in the blog.`
                  : "Inbox is clear. Everything is up to date."}
            </p>
            {/* Inline keyboard hint that points to a real working feature */}
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-slate-500">
              <span>Press</span>
              <kbd className="inline-flex items-center gap-0.5 h-6 px-2 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-mono font-semibold text-slate-700">
                ⌘K
              </kbd>
              <span>to search, navigate, or run a command.</span>
            </div>
          </div>
        </div>

        {/* Up-next card — only if there's a real upcoming confirmed meeting */}
        {upNext ? (
          <Link
            href="/admin/meetings"
            className="group relative rounded-2xl border border-slate-900 bg-gradient-to-br from-[#0F1A38] via-[#0A1635] to-[#0A1230] text-white p-6 overflow-hidden block hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.4)] transition-shadow"
          >
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
            />
            {/* Sheen sweep on mount */}
            <span
              aria-hidden="true"
              className="admin-sheen absolute inset-y-0 -inset-x-1/3 w-1/3 pointer-events-none"
              style={{
                background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.10) 50%, transparent)",
              }}
            />
            <div className="relative flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300/90 inline-flex items-center gap-2">
                <span className="relative inline-flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                Up next
              </div>
              <ArrowUpRight className="w-4 h-4 text-blue-200/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="relative mt-4 text-white text-xl sm:text-[1.4rem] font-bold tracking-tight leading-tight line-clamp-2">
              {upNext.name}
            </div>
            {upNext.company && (
              <div className="relative text-blue-100/70 text-xs mt-0.5">
                {upNext.company}
              </div>
            )}
            <div className="relative mt-4 flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className="text-blue-100/55 text-[10px] font-bold uppercase tracking-[0.16em]">Date</div>
                <div className="text-white text-base font-bold tabular-nums">{friendlyDay(upNext.date)}</div>
              </div>
              <div>
                <div className="text-blue-100/55 text-[10px] font-bold uppercase tracking-[0.16em]">Time</div>
                <div className="text-white text-base font-bold tabular-nums">{upNext.timeSlot}</div>
              </div>
              <div>
                <div className="text-blue-100/55 text-[10px] font-bold uppercase tracking-[0.16em]">Type</div>
                <div className="text-white text-base font-bold capitalize">{upNext.meetingType}</div>
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/admin/meetings"
            className="group relative rounded-2xl border border-slate-200 bg-white p-6 overflow-hidden flex flex-col justify-center items-center text-center hover:border-slate-300 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
              <CalendarCheck className="w-5 h-5 text-slate-400" strokeWidth={1.8} />
            </div>
            <div className="text-slate-900 text-sm font-bold">No confirmed meetings ahead.</div>
            <div className="text-slate-500 text-xs mt-1">
              {pending > 0
                ? `${pending} pending — review and confirm to see them here.`
                : "Bookings from /schedule appear here once confirmed."}
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              Open meetings
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        )}
      </div>

      {/* ─────────────── Quick actions ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickAction
          href="/admin/blog/new"
          label="New post"
          hint="Draft an article"
          color="#4f9ef8"
          icon={FilePlus}
        />
        <QuickAction
          href="/admin/careers/new"
          label="New role"
          hint="Open a position"
          color="#F472B6"
          icon={UserPlus}
        />
        <QuickAction
          href="/admin/availability"
          label="Manage availability"
          hint="Block or open days"
          color="#34D399"
          icon={CalendarPlus}
        />
      </div>

      {/* ─────────────── KPI strip ─────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Total meetings"
          value={total}
          color="#4f9ef8"
          icon={CalendarCheck}
          delay={0}
          sparkValues={dailySeries}
          sparkId="spark-total"
        />
        <StatCard
          label="Pending review"
          value={pending}
          color="#F59E0B"
          icon={Clock}
          delay={60}
          extra={
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
              pending > 0
                ? "text-amber-700 bg-amber-50 border-amber-200"
                : "text-emerald-700 bg-emerald-50 border-emerald-200"
            }`}>
              {pending > 0 ? "Needs attention" : "All clear"}
            </span>
          }
        />
        <StatCard
          label="This week"
          value={thisWeek}
          color="#34D399"
          icon={CalendarRange}
          delay={120}
          extra={<TrendIndicator current={thisWeek} previous={lastWeek} />}
        />
        <StatCard
          label="Blocked days"
          value={blocked}
          color="#F472B6"
          icon={CalendarX}
          delay={180}
          extra={
            <Link
              href="/admin/availability"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Manage
              <ArrowRight className="w-3 h-3" />
            </Link>
          }
        />
      </div>

      {/* ─────────────── Pipeline + Heatmap ─────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-4 sm:gap-5">
        <PipelineCard
          pending={pending}
          confirmed={confirmed}
          completed={completed}
          cancelled={cancelled}
        />
        <HeatmapCard days={heatmap} />
      </div>

      {/* ─────────────── This week + Activity ─────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-4 sm:gap-5">

        {/* This week's meetings */}
        <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-slate-900 text-base font-bold tracking-tight">
                This week
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Meetings scheduled in the next 7 days.
              </p>
            </div>
            <Link
              href="/admin/meetings"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {weekMeetings.length === 0 ? (
            <div className="px-5 sm:px-6 py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
                <CalendarCheck className="w-5 h-5 text-slate-400" strokeWidth={1.8} />
              </div>
              <p className="text-slate-700 text-sm font-semibold">
                Nothing on the calendar this week.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Pending bookings from /schedule will appear here once confirmed.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {weekMeetings.map((m, i) => {
                const s = STATUS_STYLES[m.status] ?? STATUS_STYLES.pending;
                return (
                  <li
                    key={m.id}
                    className="group relative px-5 sm:px-6 py-3.5 flex items-center gap-4 hover:bg-slate-50/60 transition-colors admin-row-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full ${s.dot} scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300`}
                    />
                    <div className="w-14 shrink-0 text-center">
                      <div className="text-slate-900 text-[13px] font-bold tracking-tight tabular-nums">
                        {friendlyDay(m.date)}
                      </div>
                      <div className="text-slate-500 text-[11px] tabular-nums mt-0.5">
                        {m.timeSlot}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 text-sm font-bold tracking-tight truncate">
                          {m.name}
                        </span>
                        <span
                          className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border ${s.bg} ${s.text}`}
                        >
                          <span aria-hidden="true" className={`w-1 h-1 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </div>
                      <div className="mt-0.5 text-slate-500 text-xs truncate">
                        {m.email}
                        {m.company ? ` · ${m.company}` : ""}
                      </div>
                    </div>
                    <div className="hidden sm:block text-right shrink-0">
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 capitalize">
                        {m.meetingType}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Activity feed */}
        <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-slate-900 text-base font-bold tracking-tight inline-flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
                Activity
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Recent changes across the admin.
              </p>
            </div>
          </div>

          {activity.length === 0 ? (
            <div className="px-5 sm:px-6 py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
                <Activity className="w-5 h-5 text-slate-400" strokeWidth={1.8} />
              </div>
              <p className="text-slate-700 text-sm font-semibold">
                No activity yet.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Updates appear here as you work.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {activity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <li
                    key={a.id}
                    className="admin-row-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {a.href ? (
                      <Link
                        href={a.href}
                        className="group flex items-start gap-3 px-5 sm:px-6 py-3 hover:bg-slate-50/60 transition-colors"
                      >
                        <ActivityRow icon={Icon} color={a.color} title={a.title} subtitle={a.subtitle} at={a.at} hover />
                      </Link>
                    ) : (
                      <div className="flex items-start gap-3 px-5 sm:px-6 py-3">
                        <ActivityRow icon={Icon} color={a.color} title={a.title} subtitle={a.subtitle} at={a.at} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* ─────────────── Content cards ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <ContentCard
          href="/admin/blog"
          title="Blog"
          subtitle="Write, edit, publish articles."
          color="#4f9ef8"
          icon={Newspaper}
          stats={[
            { label: "Published", value: postsPublished, color: "emerald" },
            { label: "Drafts",    value: postsDrafts,    color: "amber" },
          ]}
        />
        <ContentCard
          href="/admin/careers"
          title="Careers"
          subtitle="Open roles for /careers."
          color="#F472B6"
          icon={Briefcase}
          stats={[
            { label: "Active", value: rolesActive, color: "emerald" },
            { label: "Hidden", value: rolesHidden, color: "slate" },
          ]}
        />
      </div>
    </div>
  );
}

/* ────────────────────── Data bucket helpers ────────────────────── */

function bucket14Days(meetings: { date: Date }[], today: Date): number[] {
  const buckets = new Array<number>(14).fill(0);
  for (const m of meetings) {
    const day = new Date(Date.UTC(m.date.getUTCFullYear(), m.date.getUTCMonth(), m.date.getUTCDate()));
    const diffDays = Math.floor((today.getTime() - day.getTime()) / 86400000);
    const idx = 13 - diffDays;
    if (idx >= 0 && idx < 14) buckets[idx]++;
  }
  return buckets;
}

/**
 * Build a 12-week (84-day) heatmap series ending today. Each cell is a
 * `{ date, count }`. Ordered oldest → newest. The first column may be a
 * partial week — we render a 7-row grid so the calendar lines up by weekday.
 */
function bucketHeatmap(
  meetings: { date: Date }[],
  today: Date
): { date: Date; count: number; key: string }[] {
  const totalDays = 12 * 7;
  const start = new Date(today);
  start.setUTCDate(today.getUTCDate() - (totalDays - 1));
  const out: { date: Date; count: number; key: string }[] = [];
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    out.push({ date: d, count: 0, key: dayKey(d) });
  }
  const lookup = new Map(out.map((b) => [b.key, b]));
  for (const m of meetings) {
    const k = dayKey(new Date(Date.UTC(m.date.getUTCFullYear(), m.date.getUTCMonth(), m.date.getUTCDate())));
    const b = lookup.get(k);
    if (b) b.count++;
  }
  return out;
}

type ActivityItem = {
  id: string;
  icon: typeof CalendarPlus;
  color: string;
  title: string;
  subtitle: string;
  href?: string;
  at: Date;
};

function buildActivity(
  meetings: { id: string; name: string; company: string | null; status: string; createdAt: Date }[],
  posts: { id: string; slug: string; title: string; status: string; createdAt: Date; updatedAt: Date }[],
  roles: { id: string; title: string; active: boolean; createdAt: Date; updatedAt: Date }[]
): ActivityItem[] {
  const out: ActivityItem[] = [];
  for (const m of meetings) {
    out.push({
      id: `m-${m.id}`,
      icon: CalendarPlus,
      color: "#4f9ef8",
      title: "Meeting booked",
      subtitle: `${m.name}${m.company ? ` · ${m.company}` : ""}`,
      href: "/admin/meetings",
      at: m.createdAt,
    });
  }
  for (const p of posts) {
    const isNew = p.createdAt.getTime() === p.updatedAt.getTime();
    out.push({
      id: `p-${p.id}`,
      icon: isNew ? FilePlus : FileEdit,
      color: p.status === "published" ? "#10B981" : "#F59E0B",
      title: isNew ? "Post created" : "Post updated",
      subtitle: p.title,
      href: `/admin/blog/${p.slug}`,
      at: p.updatedAt,
    });
  }
  for (const r of roles) {
    const isNew = r.createdAt.getTime() === r.updatedAt.getTime();
    out.push({
      id: `r-${r.id}`,
      icon: isNew ? UserPlus : UserCog,
      color: r.active ? "#F472B6" : "#94a3b8",
      title: isNew ? "Role created" : "Role updated",
      subtitle: r.title,
      href: `/admin/careers/${r.id}`,
      at: r.updatedAt,
    });
  }
  out.sort((a, b) => b.at.getTime() - a.at.getTime());
  return out.slice(0, 8);
}

/* ────────────────────── Sub-components ────────────────────── */

function StatCard({
  label,
  value,
  color,
  icon: Icon,
  delay,
  extra,
  sparkValues,
  sparkId,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof CalendarCheck;
  delay: number;
  extra?: React.ReactNode;
  sparkValues?: number[];
  sparkId?: string;
}) {
  return (
    <div
      className="stat-pop relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 overflow-hidden hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:-translate-y-px transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-[0.16] blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center"
          style={{ background: `${color}14` }}
        >
          <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.9} />
        </div>
      </div>
      <div className="relative mt-5 text-slate-900 text-3xl sm:text-[2.25rem] font-extrabold tracking-tight tabular-nums leading-none">
        <AnimatedNumber value={value} duration={1000} delay={delay} />
      </div>
      <div className="relative mt-1.5 text-slate-500 text-xs sm:text-[13px] font-medium">
        {label}
      </div>
      {sparkValues && sparkId && (
        <div className="relative mt-3">
          <Sparkline values={sparkValues} color={color} fillId={sparkId} />
        </div>
      )}
      {extra && (
        <div className="relative mt-3 flex items-center justify-between gap-2">
          {extra}
        </div>
      )}
    </div>
  );
}

function Sparkline({ values, color, fillId }: { values: number[]; color: string; fillId: string }) {
  const max = Math.max(...values, 1);
  const w = 100;
  const h = 28;
  const n = values.length;
  if (n === 0) return null;
  const stepX = n > 1 ? w / (n - 1) : w;
  const pts = values.map((v, i) => {
    const x = i * stepX;
    const y = h - (v / max) * (h - 4) - 2;
    return { x, y };
  });
  // Smooth curve via cubic bezier midpoints.
  let pathD = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < n; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cx1 = prev.x + (curr.x - prev.x) / 2;
    const cx2 = prev.x + (curr.x - prev.x) / 2;
    pathD += ` C ${cx1} ${prev.y}, ${cx2} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${fillId})`} />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="admin-spark-path"
      />
    </svg>
  );
}

function TrendIndicator({ current, previous }: { current: number; previous: number }) {
  if (previous === 0 && current === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
        <Minus className="w-3 h-3" />
        No change
      </span>
    );
  }
  const delta = current - previous;
  const pct = previous === 0 ? 100 : Math.round((delta / previous) * 100);
  const up = delta >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
        up ? "text-emerald-700" : "text-red-700"
      }`}
    >
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {up ? "+" : ""}
      {pct}% vs last week
    </span>
  );
}

function QuickAction({
  href,
  label,
  hint,
  color,
  icon: Icon,
}: {
  href: string;
  label: string;
  hint: string;
  color: string;
  icon: typeof Plus;
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(15,23,42,0.05)] hover:-translate-y-px transition-all duration-300 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />
      <span
        aria-hidden="true"
        className="relative w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-300"
        style={{
          background: `${color}14`,
          borderColor: `${color}30`,
        }}
      >
        <Icon className="w-4 h-4" style={{ color }} strokeWidth={2.1} />
      </span>
      <div className="relative min-w-0 flex-1">
        <div className="text-slate-900 text-sm font-bold tracking-tight">
          {label}
        </div>
        <div className="text-slate-500 text-[11px]">{hint}</div>
      </div>
      <ArrowUpRight className="relative w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </Link>
  );
}

function PipelineCard({
  pending,
  confirmed,
  completed,
  cancelled,
}: {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}) {
  const total = pending + confirmed + completed + cancelled;
  const segs: { key: keyof typeof STATUS_STYLES; count: number }[] = [
    { key: "pending",   count: pending },
    { key: "confirmed", count: confirmed },
    { key: "completed", count: completed },
    { key: "cancelled", count: cancelled },
  ];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-1">
        <h2 className="text-slate-900 text-base font-bold tracking-tight inline-flex items-center gap-2">
          <CircleDot className="w-3.5 h-3.5 text-slate-400" />
          Pipeline
        </h2>
        <Link
          href="/admin/meetings"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
        >
          Details
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      <p className="text-slate-500 text-xs mb-5">
        Distribution across all meeting statuses.
      </p>

      {/* Stacked bar */}
      <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
        {total === 0 ? (
          <div className="w-full bg-slate-200/60" />
        ) : (
          segs.map((s, i) => {
            const pct = (s.count / total) * 100;
            if (pct === 0) return null;
            const style = STATUS_STYLES[s.key];
            return (
              <div
                key={s.key}
                className="admin-bar-fill h-full"
                style={{
                  width: `${pct}%`,
                  background: style.hex,
                  animationDelay: `${i * 120}ms`,
                }}
                title={`${style.label}: ${s.count}`}
              />
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
        {segs.map((s) => {
          const style = STATUS_STYLES[s.key];
          const pct = total === 0 ? 0 : Math.round((s.count / total) * 100);
          return (
            <div key={s.key} className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: style.hex }}
              />
              <div className="flex-1 min-w-0 flex items-baseline justify-between gap-2">
                <span className="text-slate-700 text-xs font-semibold truncate">
                  {style.label}
                </span>
                <span className="text-slate-500 text-[11px] tabular-nums">
                  <span className="text-slate-900 font-bold">{s.count}</span>
                  <span className="ml-1 text-slate-400">· {pct}%</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HeatmapCard({ days }: { days: { date: Date; count: number; key: string }[] }) {
  // Group into 12 columns of 7 (each column is a week, sun→sat by index).
  // But days are linear oldest→newest. We render as a row of 12 columns,
  // each a 7-cell column, but we need to know each day's weekday to place it.
  // Simplify: place day i at column = floor(i/7), row = i%7. That puts
  // consecutive days vertically within a column, advancing columns each week
  // since start aligned. Visually shows weekly cadence; close enough.
  //
  // Cell color intensity scales with count, capped at max.
  const max = Math.max(...days.map((d) => d.count), 1);
  const cells: { date: Date; count: number; col: number; row: number; key: string }[] = days.map(
    (d, i) => ({ ...d, col: Math.floor(i / 7), row: i % 7 })
  );

  const intensity = (count: number): string => {
    if (count === 0) return "rgba(15,23,42,0.05)";
    const ratio = Math.min(1, count / max);
    // emerald → blue gradient via stops; pick blue for premium feel
    const alpha = 0.25 + ratio * 0.65;
    return `rgba(79,158,248,${alpha.toFixed(3)})`;
  };

  const totalCount = days.reduce((sum, d) => sum + d.count, 0);
  const activeDays = days.filter((d) => d.count > 0).length;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-1">
        <h2 className="text-slate-900 text-base font-bold tracking-tight inline-flex items-center gap-2">
          <CalendarRange className="w-3.5 h-3.5 text-slate-400" />
          Meeting density
        </h2>
        <span className="text-xs text-slate-500 tabular-nums">
          <span className="text-slate-900 font-bold">{totalCount}</span> across{" "}
          <span className="text-slate-900 font-bold">{activeDays}</span> day{activeDays === 1 ? "" : "s"}
        </span>
      </div>
      <p className="text-slate-500 text-xs mb-4">
        Last 12 weeks. Darker means more bookings that day.
      </p>

      <div className="overflow-x-auto -mx-1 px-1">
        <div className="flex gap-1 min-w-[280px]" role="presentation">
          {Array.from({ length: 12 }).map((_, col) => (
            <div key={col} className="flex flex-col gap-1 flex-1">
              {Array.from({ length: 7 }).map((__, row) => {
                const idx = col * 7 + row;
                const cell = cells[idx];
                if (!cell) {
                  return <span key={row} className="aspect-square w-full" />;
                }
                return (
                  <span
                    key={row}
                    role="img"
                    aria-label={`${cell.count} on ${cell.date.toISOString().slice(0, 10)}`}
                    title={`${cell.date.toISOString().slice(0, 10)} — ${cell.count} meeting${cell.count === 1 ? "" : "s"}`}
                    className="admin-heatmap-cell aspect-square w-full rounded-[3px] border border-slate-200/60"
                    style={{
                      background: intensity(cell.count),
                      animationDelay: `${(col * 7 + row) * 6}ms`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] text-slate-500">
        <span>Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((r) => (
          <span
            key={r}
            className="w-3 h-3 rounded-[3px] border border-slate-200/60"
            style={{
              background:
                r === 0 ? "rgba(15,23,42,0.05)" : `rgba(79,158,248,${(0.25 + r * 0.65).toFixed(3)})`,
            }}
          />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}

function ActivityRow({
  icon: Icon,
  color,
  title,
  subtitle,
  at,
  hover,
}: {
  icon: typeof CalendarPlus;
  color: string;
  title: string;
  subtitle: string;
  at: Date;
  hover?: boolean;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className="w-7 h-7 rounded-lg flex items-center justify-center border shrink-0"
        style={{ background: `${color}14`, borderColor: `${color}30` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color }} strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 justify-between">
          <span
            className={`text-slate-900 text-xs font-bold tracking-tight truncate ${
              hover ? "group-hover:text-slate-700 transition-colors" : ""
            }`}
          >
            {title}
          </span>
          <span className="text-slate-400 text-[10px] tabular-nums shrink-0">
            {relativeTime(at)}
          </span>
        </div>
        <div className="text-slate-500 text-xs truncate mt-0.5">{subtitle}</div>
      </div>
    </>
  );
}

function ContentCard({
  href,
  title,
  subtitle,
  color,
  icon: Icon,
  stats,
}: {
  href: string;
  title: string;
  subtitle: string;
  color: string;
  icon: typeof Newspaper;
  stats: { label: string; value: number; color: "emerald" | "amber" | "slate" }[];
}) {
  const labelStyles: Record<string, string> = {
    emerald: "text-emerald-700",
    amber:   "text-amber-700",
    slate:   "text-slate-500",
  };

  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] hover:-translate-y-px transition-all duration-300 block overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-[0.16] blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />
      <div className="relative flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center"
          style={{ background: `${color}14` }}
        >
          <Icon className="w-4 h-4" style={{ color, width: 18, height: 18 }} strokeWidth={1.9} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <div className="relative mt-4">
        <h3 className="text-slate-900 text-base font-bold tracking-tight">{title}</h3>
        <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
      </div>
      <div className="relative mt-5 flex items-center gap-6">
        {stats.map((s) => (
          <div key={s.label}>
            <div className={`text-[10px] font-bold uppercase tracking-[0.16em] ${labelStyles[s.color]}`}>
              {s.label}
            </div>
            <div className="text-slate-900 text-2xl font-extrabold tabular-nums">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
