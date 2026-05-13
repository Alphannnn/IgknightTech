import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { updateStatusAction, deleteAction } from "./actions";
import {
  Check,
  X,
  CheckCircle2,
  Trash2,
  Calendar,
  Mail,
  Building2,
  MessageSquare,
  Clock,
  CalendarCheck,
} from "lucide-react";

const STATUSES = ["all", "pending", "confirmed", "completed", "cancelled"] as const;

const STATUS_LABEL: Record<string, string> = {
  all: "All",
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_BADGE: Record<string, { bg: string; text: string }> = {
  pending:   { bg: "bg-amber-50 border-amber-200",     text: "text-amber-700"  },
  confirmed: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700"},
  completed: { bg: "bg-blue-50 border-blue-200",       text: "text-blue-700"   },
  cancelled: { bg: "bg-slate-100 border-slate-200",    text: "text-slate-500"  },
};

const MEETING_TYPE_LABEL: Record<string, string> = {
  discovery:    "Discovery",
  consultation: "Consultation",
  technical:    "Technical",
  general:      "General",
};

const MEETING_TYPE_COLOR: Record<string, string> = {
  discovery:    "#7BB6FF",
  consultation: "#A78BFA",
  technical:    "#34D399",
  general:      "#F472B6",
};

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status: rawStatus } = await searchParams;
  const status =
    rawStatus && ["pending", "confirmed", "cancelled", "completed"].includes(rawStatus)
      ? rawStatus
      : "all";

  const [meetings, counts] = await Promise.all([
    db.meeting.findMany({
      where: status === "all" ? {} : { status },
      orderBy: [{ date: "asc" }, { createdAt: "desc" }],
    }),
    db.meeting.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const countMap: Record<string, number> = { all: 0 };
  for (const c of counts) {
    countMap[c.status] = c._count.status;
    countMap.all += c._count.status;
  }

  return (
    <div className="admin-page-in space-y-7">

      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Operations
          </div>
          <h1 className="mt-1 text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Meetings
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Bookings from the public /schedule page. Confirm or cancel here.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUSES.map((s) => {
          const active = status === s;
          const count = countMap[s] ?? 0;
          const href = s === "all" ? "/admin/meetings" : `/admin/meetings?status=${s}`;
          return (
            <Link
              key={s}
              href={href}
              className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                active
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {STATUS_LABEL[s]}
              <span
                className={`font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-full ${
                  active ? "bg-white/15 text-white/85" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Meetings list */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">

        {meetings.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
              <CalendarCheck className="w-6 h-6 text-slate-400" strokeWidth={1.7} />
            </div>
            <p className="text-slate-900 text-base font-bold">
              {status === "all"
                ? "No meetings yet."
                : `No ${status} meetings.`}
            </p>
            <p className="text-slate-500 text-sm mt-1.5 max-w-md mx-auto">
              Bookings made through{" "}
              <Link href="/schedule" target="_blank" className="text-slate-900 underline-offset-4 hover:underline font-semibold">
                /schedule
              </Link>{" "}
              show up here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {meetings.map((m) => {
              const badge = STATUS_BADGE[m.status] ?? STATUS_BADGE.pending;
              const typeColor = MEETING_TYPE_COLOR[m.meetingType] ?? "#94a3b8";
              const typeLabel = MEETING_TYPE_LABEL[m.meetingType] ?? m.meetingType;
              const dateStr = m.date.toUTCString().slice(0, 16);

              return (
                <li
                  key={m.id}
                  className="group relative px-5 sm:px-6 py-5 hover:bg-slate-50/60 transition-colors"
                >
                  {/* Left accent bar on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300"
                    style={{ background: typeColor }}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_auto] gap-4 items-start lg:items-center">

                    {/* Booker + meta */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-slate-900 text-base font-bold tracking-tight truncate">
                          {m.name}
                        </h3>
                        <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text}`}>
                          {STATUS_LABEL[m.status] ?? m.status}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border"
                          style={{
                            background: `${typeColor}1F`,
                            borderColor: `${typeColor}40`,
                            color: typeColor,
                          }}
                        >
                          <span aria-hidden="true" className="w-1 h-1 rounded-full" style={{ background: typeColor }} />
                          {typeLabel}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-x-4 gap-y-1 flex-wrap text-xs text-slate-500">
                        <a
                          href={`mailto:${m.email}`}
                          className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                        >
                          <Mail className="w-3 h-3" /> {m.email}
                        </a>
                        {m.company && (
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 className="w-3 h-3" /> {m.company}
                          </span>
                        )}
                      </div>
                      {m.message && (
                        <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-600 max-w-2xl">
                          <MessageSquare className="w-3 h-3 mt-0.5 shrink-0 text-slate-400" />
                          <span className="leading-relaxed">{m.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Date / time */}
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {dateStr}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-slate-500 text-xs">
                        <Clock className="w-3 h-3" />
                        {m.timeSlot}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          name="status"
                          value="confirmed"
                          disabled={m.status === "confirmed"}
                          title="Confirm"
                          aria-label="Confirm meeting"
                          className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                        >
                          <Check className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                        </button>
                      </form>
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          name="status"
                          value="completed"
                          disabled={m.status === "completed"}
                          title="Mark completed"
                          aria-label="Mark meeting completed"
                          className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                        </button>
                      </form>
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          name="status"
                          value="cancelled"
                          disabled={m.status === "cancelled"}
                          title="Cancel"
                          aria-label="Cancel meeting"
                          className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                        >
                          <X className="w-4 h-4 text-slate-500 group-hover:text-amber-600 transition-colors" />
                        </button>
                      </form>
                      <form action={deleteAction}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          type="submit"
                          title="Delete"
                          aria-label="Delete meeting"
                          className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-red-300 hover:bg-red-50 flex items-center justify-center transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-red-600 transition-colors" />
                        </button>
                      </form>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
