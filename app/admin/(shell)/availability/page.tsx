import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { toggleDayAction } from "./actions";
import { ChevronLeft, ChevronRight, CalendarX, Check } from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseMonth(input: string | undefined): { year: number; month: number } {
  if (input && /^\d{4}-\d{2}$/.test(input)) {
    const [y, m] = input.split("-").map(Number);
    if (m >= 1 && m <= 12) return { year: y, month: m - 1 };
  }
  const now = new Date();
  return { year: now.getUTCFullYear(), month: now.getUTCMonth() };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function ymd(y: number, m: number, d: number): string {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

export default async function AvailabilityPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  await requireAdmin();

  const { month: monthParam } = await searchParams;
  const { year, month } = parseMonth(monthParam);

  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const startWeekday = firstOfMonth.getUTCDay(); // 0 = Sun

  // Next / prev month nav
  const prev = new Date(Date.UTC(year, month - 1, 1));
  const next = new Date(Date.UTC(year, month + 1, 1));
  const prevHref = `/admin/availability?month=${prev.getUTCFullYear()}-${pad(prev.getUTCMonth() + 1)}`;
  const nextHref = `/admin/availability?month=${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}`;

  // Fetch all overrides in this month range
  const rangeStart = new Date(Date.UTC(year, month, 1));
  const rangeEnd = new Date(Date.UTC(year, month + 1, 1));
  const overrides = await db.availabilityOverride.findMany({
    where: { date: { gte: rangeStart, lt: rangeEnd } },
  });
  const blockedSet = new Set(
    overrides.map((o) => o.date.toISOString().slice(0, 10))
  );

  // Today (UTC) for "past day" comparison
  const now = new Date();
  const todayY = now.getUTCFullYear();
  const todayM = now.getUTCMonth();
  const todayD = now.getUTCDate();
  const todayStr = ymd(todayY, todayM, todayD);

  // Build the grid: pad with empty cells before the 1st, fill out to a multiple of 7
  const cells: Array<{ day?: number; dateStr?: string }> = [];
  for (let i = 0; i < startWeekday; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, dateStr: ymd(year, month, d) });
  }
  while (cells.length % 7 !== 0) cells.push({});

  // Stats
  const totalBlocked = blockedSet.size;
  const totalAvailable = daysInMonth - totalBlocked;

  return (
    <div className="admin-page-in space-y-7">

      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Operations
          </div>
          <h1 className="mt-1 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Availability
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Click a day to toggle whether bookings are accepted that day.
          </p>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.16em]">
            Available days
          </div>
          <div className="mt-2 text-emerald-600 text-3xl font-extrabold tabular-nums">
            {totalAvailable}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.16em]">
            Blocked days
          </div>
          <div className="mt-2 text-red-600 text-3xl font-extrabold tabular-nums">
            {totalBlocked}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 col-span-2 sm:col-span-1">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.16em]">
            Total days this month
          </div>
          <div className="mt-2 text-slate-900 text-3xl font-extrabold tabular-nums">
            {daysInMonth}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">

        {/* Month nav */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-slate-900 text-lg font-bold tracking-tight">
              {MONTH_NAMES[month]} {year}
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Green = bookable · Red = blocked · Gray = past
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href={prevHref}
              aria-label="Previous month"
              className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </Link>
            <Link
              href={nextHref}
              aria-label="Next month"
              className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>

        {/* Day-of-week header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/60">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              className="px-2 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-px bg-slate-200/70">
          {cells.map((c, i) => {
            if (!c.day || !c.dateStr) {
              return (
                <div key={i} className="bg-slate-50/50 aspect-square sm:aspect-[4/3]" />
              );
            }
            const blocked = blockedSet.has(c.dateStr);
            const isToday = c.dateStr === todayStr;
            const isPast = c.dateStr < todayStr;

            const baseCls =
              "relative bg-white aspect-square sm:aspect-[4/3] p-2 sm:p-2.5 flex flex-col justify-between transition-colors";

            // Past — disabled visual, no form
            if (isPast) {
              return (
                <div
                  key={i}
                  className={`${baseCls} text-slate-300 cursor-not-allowed`}
                  aria-disabled="true"
                >
                  <span className="text-[11px] sm:text-xs font-bold tabular-nums">
                    {c.day}
                  </span>
                </div>
              );
            }

            return (
              <form
                key={i}
                action={toggleDayAction}
                className={`${baseCls} group ${
                  blocked
                    ? "bg-red-50 hover:bg-red-100"
                    : "hover:bg-emerald-50/70"
                }`}
              >
                <input type="hidden" name="day" value={c.dateStr} />
                <button
                  type="submit"
                  aria-label={
                    blocked
                      ? `Unblock ${c.dateStr}`
                      : `Block ${c.dateStr}`
                  }
                  className="absolute inset-0 w-full h-full cursor-pointer"
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className={`text-[11px] sm:text-xs font-bold tabular-nums ${
                      blocked ? "text-red-700" : "text-slate-900"
                    }`}
                  >
                    {c.day}
                  </span>
                  {isToday && (
                    <span
                      aria-hidden="true"
                      className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#2783ED] bg-[#2783ED]/10 px-1.5 py-0.5 rounded-full"
                    >
                      Today
                    </span>
                  )}
                </div>
                <div className="relative flex items-end justify-end">
                  {blocked ? (
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-red-700"
                    >
                      <CalendarX className="w-3 h-3" />
                      Blocked
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Check className="w-3 h-3" />
                      Open
                    </span>
                  )}
                </div>
              </form>
            );
          })}
        </div>
      </section>

      {/* Help note */}
      <p className="text-slate-500 text-xs leading-relaxed max-w-2xl">
        Blocked days are hidden from the public /schedule date picker and any
        booking attempt for them will be rejected. Toggling a blocked day back
        on makes it bookable again immediately.
      </p>
    </div>
  );
}
