import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import AnimatedNumber from "../AnimatedNumber";
import Greeting from "../Greeting";
import AdminAtmosphere from "../AdminAtmosphere";
import BookingsChart, { type ChartPoint } from "../charts/BookingsChart";
import StatusDonut from "../charts/StatusDonut";
import MiniSpark from "../charts/MiniSpark";
import CountdownChip from "../charts/CountdownChip";
import {
  CalendarCheck,
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  FilePlus,
  FileEdit,
  UserPlus,
  UserCog,
  CalendarPlus,
  type LucideIcon,
} from "lucide-react";

/* ────────────────────── Time helpers ────────────────────── */

function startOfTodayUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}
function dayKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 45) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}
function friendlyDay(d: Date): string {
  const today = startOfTodayUTC();
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const k = dayKey(d);
  if (k === dayKey(today)) return "Today";
  if (k === dayKey(tomorrow)) return "Tomorrow";
  return d.toUTCString().slice(0, 11).trim();
}

const STATUS_STYLES: Record<
  string,
  { label: string; bg: string; text: string; dot: string; hex: string }
> = {
  pending:   { label: "Pending",   bg: "bg-amber-50 border-amber-200",     text: "text-amber-700",   dot: "bg-amber-500",   hex: "#F59E0B" },
  confirmed: { label: "Confirmed", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500", hex: "#10B981" },
  completed: { label: "Completed", bg: "bg-blue-50 border-blue-200",       text: "text-blue-700",    dot: "bg-blue-500",    hex: "#2783ED" },
  cancelled: { label: "Cancelled", bg: "bg-slate-100 border-slate-200",    text: "text-slate-500",   dot: "bg-slate-400",   hex: "#94a3b8" },
};

/* ────────────────────── Page ────────────────────── */

export default async function AdminDashboardPage() {
  await requireAdmin();

  const today = startOfTodayUTC();
  const weekEnd = new Date(today);
  weekEnd.setUTCDate(today.getUTCDate() + 7);
  const lastWeekStart = new Date(today);
  lastWeekStart.setUTCDate(today.getUTCDate() - 7);
  const fourteenDaysAgo = new Date(today);
  fourteenDaysAgo.setUTCDate(today.getUTCDate() - 13);

  const [
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    thisWeek,
    lastWeek,
    upNext,
    weekMeetings,
    postsDrafts,
    chartMeetings,
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
    db.meeting.findFirst({
      where: { status: "confirmed", date: { gte: today } },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
    }),
    db.meeting.findMany({
      where: {
        date: { gte: today, lt: weekEnd },
        status: { in: ["confirmed", "pending"] },
      },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
      take: 6,
    }),
    db.blogPost.count({ where: { status: "draft" } }),
    db.meeting.findMany({
      where: { date: { gte: fourteenDaysAgo } },
      select: { date: true },
    }),
    db.meeting.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, name: true, company: true, status: true, createdAt: true },
    }),
    db.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
      select: { id: true, slug: true, title: true, status: true, createdAt: true, updatedAt: true },
    }),
    db.careerRole.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
      select: { id: true, title: true, active: true, createdAt: true, updatedAt: true },
    }),
  ]);

  const activity = buildActivity(recentMeetings, recentPosts, recentRoles);
  const confirmationRate =
    total === 0 ? 0 : Math.round(((confirmed + completed) / total) * 100);

  const trendSeries = bucket14Days(chartMeetings, today);
  const chartData: ChartPoint[] = buildChartData(trendSeries, today);

  const donutSegments = [
    { label: "Pending",   value: pending,   color: "#F59E0B" },
    { label: "Confirmed", value: confirmed, color: "#22D3EE" },
    { label: "Completed", value: completed, color: "#2783ED" },
    { label: "Cancelled", value: cancelled, color: "#94A3B8" },
  ].filter((s) => s.value > 0);

  // Build a friendly UTC datetime for the countdown — combine date + timeSlot
  const upNextDateTimeISO = upNext ? buildMeetingISO(upNext.date, upNext.timeSlot) : null;

  return (
    <div className="admin-page-in relative space-y-6 pb-4">

      <AdminAtmosphere />

      {/* ════════ Row 1 — Greeting + 3 KPI tiles + Up Next ════════ */}
      <header className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">

        {/* Big hero card with KPI tiles inside */}
        <article className="relative rounded-[24px] border border-slate-200/60 bg-white/85 backdrop-blur-sm p-7 sm:p-8 overflow-hidden">

          {/* Top hairline sheen */}
          <span
            aria-hidden="true"
            className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#2783ED]/40 to-transparent"
          />

          {/* Soft corner glow */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-16 w-72 h-72 rounded-full opacity-[0.18] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #2783ED 0%, #8B5CF6 60%, transparent 80%)",
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-500">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>Live</span>
              <span className="mx-1.5 w-px h-3 bg-slate-200" />
              <span className="text-slate-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="mt-4 text-slate-900 text-[2rem] sm:text-[2.4rem] font-bold tracking-tight leading-[1.05]">
              <Greeting />
              <span
                aria-hidden="true"
                className="inline-block ml-2 text-[1.4rem] align-middle"
                style={{
                  background:
                    "linear-gradient(135deg, #2783ED 0%, #8B5CF6 60%, #22D3EE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ✦
              </span>
            </h1>
            <p className="mt-2 text-slate-500 text-sm sm:text-[15px] max-w-md">
              {pending > 0
                ? `${pending} meeting${pending === 1 ? "" : "s"} waiting on you${postsDrafts > 0 ? `, ${postsDrafts} draft${postsDrafts === 1 ? "" : "s"} in the blog.` : "."}`
                : postsDrafts > 0
                  ? `Inbox is clear. ${postsDrafts} draft${postsDrafts === 1 ? "" : "s"} sitting in the blog.`
                  : "Inbox is clear. Everything is up to date."}
            </p>

            {/* 3 mini KPI tiles inline */}
            <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
              <KpiTile
                value={total}
                label="Total bookings"
                hint="all-time"
                icon={CalendarCheck}
                accent="#2783ED"
                spark={trendSeries}
                delay={0}
              />
              <KpiTile
                value={pending}
                label="Pending"
                hint={pending > 0 ? "needs attention" : "all clear"}
                icon={Zap}
                accent={pending > 0 ? "#F59E0B" : "#10B981"}
                pulse={pending > 0}
                delay={120}
              />
              <KpiTile
                value={confirmationRate}
                suffix="%"
                label="Confirm rate"
                hint={`${confirmed + completed} of ${total}`}
                icon={CheckCircle2}
                accent="#10B981"
                delay={240}
              />
            </div>
          </div>
        </article>

        {/* Up Next card */}
        {upNext ? (
          <UpNextCard upNext={upNext} datetimeISO={upNextDateTimeISO!} />
        ) : (
          <UpNextEmpty pending={pending} />
        )}
      </header>

      {/* ════════ Row 2 — Charts row ════════ */}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">

        {/* Big animated line chart */}
        <article className="group relative rounded-[24px] border border-slate-200/60 bg-white/85 backdrop-blur-sm overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/40 to-transparent"
          />

          <header className="px-7 sm:px-8 pt-6 pb-4 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                Trend
              </div>
              <h2 className="mt-1.5 text-slate-900 text-[1.4rem] sm:text-[1.6rem] font-bold tracking-tight leading-tight">
                Bookings over time
              </h2>
              <p className="mt-1 text-slate-500 text-xs sm:text-[13px]">
                Last 14 days · hover any point for details.
              </p>
            </div>

            {/* Total + trend */}
            <div className="flex items-center gap-5">
              <div>
                <div className="text-slate-900 text-[1.8rem] font-bold tabular-nums leading-none">
                  <AnimatedNumber value={chartData.reduce((s, p) => s + p.value, 0)} duration={1200} />
                </div>
                <div className="text-slate-400 text-[10px] font-semibold tracking-[0.18em] uppercase mt-1">
                  In window
                </div>
              </div>
              <TrendPill current={thisWeek} previous={lastWeek} />
            </div>
          </header>

          <div className="px-3 sm:px-4 pb-5">
            <BookingsChart data={chartData} height={240} />
          </div>
        </article>

        {/* Donut chart */}
        <article className="group relative rounded-[24px] border border-slate-200/60 bg-white/85 backdrop-blur-sm overflow-hidden flex flex-col">
          <span
            aria-hidden="true"
            className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent"
          />

          <header className="px-7 pt-6 pb-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <Activity className="w-3 h-3 text-[#22D3EE]" />
              Status
            </div>
            <h2 className="mt-1.5 text-slate-900 text-[1.4rem] font-bold tracking-tight leading-tight">
              Pipeline mix
            </h2>
            <p className="mt-1 text-slate-500 text-xs sm:text-[13px]">
              Hover a segment to drill in.
            </p>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-2">
            {donutSegments.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mb-2">
                  <Activity className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-slate-700 text-sm font-medium">No bookings yet.</p>
                <p className="text-slate-400 text-xs mt-1">
                  The donut lights up once requests come in.
                </p>
              </div>
            ) : (
              <StatusDonut segments={donutSegments} size={220} thickness={18} />
            )}
          </div>

          {donutSegments.length > 0 && (
            <div className="px-7 pb-6 pt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {donutSegments.map((s) => {
                const sum = donutSegments.reduce((a, b) => a + b.value, 0) || 1;
                const pct = Math.round((s.value / sum) * 100);
                return (
                  <div key={s.label} className="flex items-center gap-2 min-w-0">
                    <span
                      aria-hidden="true"
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: s.color }}
                    />
                    <span className="text-slate-700 text-[12px] font-medium truncate flex-1">
                      {s.label}
                    </span>
                    <span className="text-slate-500 text-[11px] tabular-nums">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </article>
      </section>

      {/* ════════ Row 3 — This week + Activity ════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-5">

        {/* This week's meetings */}
        <article className="group relative rounded-[24px] border border-slate-200/60 bg-white/85 backdrop-blur-sm overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#2783ED]/40 to-transparent"
          />

          <header className="px-7 pt-6 pb-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                <CalendarCheck className="w-3 h-3 text-[#2783ED]" />
                Next 7 days
              </div>
              <h2 className="mt-1.5 text-slate-900 text-[1.4rem] font-bold tracking-tight leading-tight">
                This week
              </h2>
            </div>
            <Link
              href="/admin/meetings"
              className="group/cta inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
            </Link>
          </header>

          {weekMeetings.length === 0 ? (
            <EmptyRow
              icon={CalendarCheck}
              title="Nothing on the calendar this week."
              hint="Pending bookings from /schedule will appear here once confirmed."
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {weekMeetings.map((m, i) => {
                const s = STATUS_STYLES[m.status] ?? STATUS_STYLES.pending;
                return (
                  <li
                    key={m.id}
                    className="group/row relative px-7 py-3.5 flex items-center gap-4 hover:bg-slate-50/70 transition-all duration-300 admin-row-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${s.dot} scale-y-0 group-hover/row:scale-y-100 origin-center transition-transform duration-300`}
                    />

                    <div className="w-14 shrink-0 text-center">
                      <div className="text-slate-900 text-[13px] font-bold tracking-tight tabular-nums">
                        {friendlyDay(m.date)}
                      </div>
                      <div className="text-slate-500 text-[10px] tabular-nums mt-0.5">
                        {m.timeSlot}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 text-[14px] font-semibold tracking-tight truncate">
                          {m.name}
                        </span>
                        <span
                          className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border ${s.bg} ${s.text}`}
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
                      <span className="text-[11px] text-slate-400 capitalize font-medium">
                        {m.meetingType}
                      </span>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover/row:text-slate-900 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-all" />
                  </li>
                );
              })}
            </ul>
          )}
        </article>

        {/* Recent activity */}
        <article className="group relative rounded-[24px] border border-slate-200/60 bg-white/85 backdrop-blur-sm overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent"
          />

          <header className="px-7 pt-6 pb-4">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <Activity className="w-3 h-3 text-[#8B5CF6]" />
              Live feed
            </div>
            <h2 className="mt-1.5 text-slate-900 text-[1.4rem] font-bold tracking-tight leading-tight">
              Activity
            </h2>
          </header>

          {activity.length === 0 ? (
            <EmptyRow
              icon={Activity}
              title="No activity yet."
              hint="Updates appear here as you work."
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {activity.map((a, i) => {
                const Icon = a.icon;
                const Row = (
                  <ActivityRow
                    icon={Icon}
                    color={a.color}
                    title={a.title}
                    subtitle={a.subtitle}
                    at={a.at}
                  />
                );
                return (
                  <li
                    key={a.id}
                    className="admin-row-in"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {a.href ? (
                      <Link
                        href={a.href}
                        className="group/row flex items-start gap-3 px-7 py-3 hover:bg-slate-50/70 transition-colors"
                      >
                        {Row}
                      </Link>
                    ) : (
                      <div className="flex items-start gap-3 px-7 py-3">{Row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </article>
      </section>
    </div>
  );
}

/* ────────────────────── KPI tile (inside hero card) ────────────────────── */

function KpiTile({
  value,
  suffix,
  label,
  hint,
  icon: Icon,
  accent,
  spark,
  pulse,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  accent: string;
  spark?: number[];
  pulse?: boolean;
  delay: number;
}) {
  return (
    <div
      className="stat-pop group relative rounded-[16px] border border-slate-200/60 bg-white p-4 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.10)] transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Accent corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-30 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center border"
          style={{
            background: `${accent}14`,
            borderColor: `${accent}30`,
          }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} strokeWidth={2.2} />
        </span>
        {pulse && (
          <span className="relative flex w-2 h-2 mt-1.5">
            <span
              className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping"
              style={{ background: accent }}
            />
            <span
              className="relative inline-flex w-2 h-2 rounded-full"
              style={{ background: accent }}
            />
          </span>
        )}
      </div>

      <div
        className="relative mt-4 text-slate-900 font-bold tracking-tight tabular-nums leading-none"
        style={{ fontSize: "clamp(1.5rem, 2vw + 0.4rem, 1.85rem)" }}
      >
        <AnimatedNumber value={value} duration={1100} delay={delay} />
        {suffix && (
          <span className="text-slate-400 text-base font-bold ml-0.5">{suffix}</span>
        )}
      </div>

      <div className="relative mt-1 flex items-baseline justify-between gap-2">
        <span className="text-slate-700 text-[12px] font-semibold">{label}</span>
        <span className="text-slate-400 text-[10px] font-medium">{hint}</span>
      </div>

      {spark && spark.length > 0 && (
        <div className="relative mt-2 h-7">
          <MiniSpark values={spark} color={accent} height={28} />
        </div>
      )}
    </div>
  );
}

/* ────────────────────── Up Next card (with live countdown) ────────────────────── */

function UpNextCard({
  upNext,
  datetimeISO,
}: {
  upNext: {
    name: string;
    company: string | null;
    date: Date;
    timeSlot: string;
    meetingType: string;
  };
  datetimeISO: string;
}) {
  return (
    <Link
      href="/admin/meetings"
      className="group relative rounded-[24px] overflow-hidden block hover:shadow-[0_18px_50px_-18px_rgba(14,31,85,0.45)] transition-shadow"
      style={{
        background:
          "linear-gradient(135deg, #0F1A38 0%, #1A2A78 50%, #2D1B69 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.08) inset, 0 10px 30px -10px rgba(14,31,85,0.35)",
      }}
    >
      {/* Atmospheric orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-12 w-44 h-44 rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-14 -left-10 w-40 h-40 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
      />

      {/* Top sheen */}
      <span
        aria-hidden="true"
        className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
      <span
        aria-hidden="true"
        className="admin-sheen absolute inset-y-0 -inset-x-1/3 w-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.12) 50%, transparent)",
        }}
      />

      <div className="relative p-6 sm:p-7 text-white">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
            Up next
          </span>
          <ArrowUpRight className="w-4 h-4 text-blue-200/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <div className="mt-5 text-white text-[1.5rem] font-bold tracking-tight leading-tight line-clamp-1">
          {upNext.name}
        </div>
        {upNext.company && (
          <div className="text-blue-100/65 text-[12px] mt-0.5 truncate">
            {upNext.company}
          </div>
        )}

        <div className="mt-4">
          <CountdownChip target={datetimeISO} />
        </div>

        <div className="mt-5 pt-5 border-t border-white/[0.08] grid grid-cols-3 gap-3">
          <Field label="Date" value={friendlyDay(upNext.date)} />
          <Field label="Time" value={upNext.timeSlot} />
          <Field label="Type" value={upNext.meetingType} capitalize />
        </div>
      </div>
    </Link>
  );
}

function Field({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div>
      <div className="text-blue-100/50 text-[9px] font-bold uppercase tracking-[0.18em]">
        {label}
      </div>
      <div
        className={`text-white text-[13px] font-bold tabular-nums mt-1 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function UpNextEmpty({ pending }: { pending: number }) {
  return (
    <Link
      href="/admin/meetings"
      className="group relative rounded-[24px] border border-slate-200/60 bg-white/85 backdrop-blur-sm p-6 overflow-hidden flex flex-col justify-center text-center hover:border-slate-300 transition-colors"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
      />
      <div className="mx-auto w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center mb-3">
        <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-2">
        Up next
      </div>
      <div className="text-slate-900 text-[15px] font-bold">
        Nothing on the horizon.
      </div>
      <div className="text-slate-500 text-xs mt-1 leading-snug max-w-[220px] mx-auto">
        {pending > 0
          ? `${pending} pending — review to see them here.`
          : "Bookings from /schedule appear here once confirmed."}
      </div>
      <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
        Open meetings
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}

/* ────────────────────── Activity row + empty state ────────────────────── */

function ActivityRow({
  icon: Icon,
  color,
  title,
  subtitle,
  at,
}: {
  icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
  at: Date;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className="relative w-7 h-7 rounded-full flex items-center justify-center border shrink-0"
        style={{ background: `${color}14`, borderColor: `${color}30` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color }} strokeWidth={2} />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity"
          style={{
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 justify-between">
          <span className="text-slate-900 text-[13px] font-semibold tracking-tight truncate">
            {title}
          </span>
          <span className="text-slate-400 text-[10px] tabular-nums shrink-0 font-medium">
            {relativeTime(at)}
          </span>
        </div>
        <div className="text-slate-500 text-xs truncate mt-0.5">{subtitle}</div>
      </div>
    </>
  );
}

function EmptyRow({
  icon: Icon,
  title,
  hint,
}: {
  icon: LucideIcon;
  title: string;
  hint: string;
}) {
  return (
    <div className="px-6 py-12 text-center">
      <div className="mx-auto w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center mb-3">
        <Icon className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
      </div>
      <p className="text-slate-900 text-sm font-semibold">{title}</p>
      <p className="text-slate-500 text-xs mt-1">{hint}</p>
    </div>
  );
}

/* ────────────────────── Trend pill ────────────────────── */

function TrendPill({ current, previous }: { current: number; previous: number }) {
  if (previous === 0 && current === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
        <Minus className="w-3 h-3" />
        Flat
      </span>
    );
  }
  const delta = current - previous;
  const pct = previous === 0 ? 100 : Math.round((delta / previous) * 100);
  const up = delta >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
        up
          ? "text-emerald-700 bg-emerald-50 border-emerald-200"
          : "text-rose-700 bg-rose-50 border-rose-200"
      }`}
    >
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {up ? "+" : ""}
      {pct}% wk
    </span>
  );
}

/* ────────────────────── Data helpers ────────────────────── */

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

function buildChartData(buckets: number[], today: Date): ChartPoint[] {
  return buckets.map((v, i) => {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - (buckets.length - 1 - i));
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return {
      label: weekday[0],
      iso: dayNum,
      value: v,
    };
  });
}

function buildMeetingISO(date: Date, timeSlot: string): string {
  // timeSlot is like "10:00 AM" or "2:30 PM"
  const match = timeSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) {
    return date.toISOString();
  }
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();
  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;
  const d = new Date(date);
  d.setUTCHours(hours, minutes, 0, 0);
  return d.toISOString();
}

type ActivityItem = {
  id: string;
  icon: LucideIcon;
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
      color: "#2783ED",
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
      color: r.active ? "#8B5CF6" : "#94a3b8",
      title: isNew ? "Role created" : "Role updated",
      subtitle: r.title,
      href: `/admin/careers/${r.id}`,
      at: r.updatedAt,
    });
  }
  out.sort((a, b) => b.at.getTime() - a.at.getTime());
  return out.slice(0, 7);
}
