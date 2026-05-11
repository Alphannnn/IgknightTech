"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar as CalIcon,
  Clock,
  Check,
  Code2,
  Briefcase,
  MessageSquare,
  Zap,
  User,
  Mail,
  Building2,
  Pencil,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/* ───────────────────────── Static data ───────────────────────── */

type MeetingType = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  duration: string;
  color: string;
};

const MEETING_TYPES: MeetingType[] = [
  {
    id: "discovery",
    icon: Zap,
    title: "Discovery Call",
    desc: "Quick intro chat — share your idea, hear how we'd approach it.",
    duration: "30 min",
    color: "#7BB6FF",
  },
  {
    id: "consultation",
    icon: Briefcase,
    title: "Project Consultation",
    desc: "Deep dive into scope, timeline, budget, and engagement model.",
    duration: "60 min",
    color: "#A78BFA",
  },
  {
    id: "technical",
    icon: Code2,
    title: "Technical Deep Dive",
    desc: "Architecture review with our engineering team — bring your stack.",
    duration: "60 min",
    color: "#34D399",
  },
  {
    id: "general",
    icon: MessageSquare,
    title: "General Inquiry",
    desc: "Other questions about our services, capabilities, or pricing.",
    duration: "30 min",
    color: "#F472B6",
  },
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* Deterministic "booked" dates — varies by month so each month shows allocation */
function getBookedDates(year: number, month: number): Set<number> {
  const set = new Set<number>();
  const seed = year * 12 + month;
  for (let i = 0; i < 6; i++) {
    const d = ((seed * 7 + i * 13) % 26) + 2;
    set.add(d);
  }
  return set;
}

/* Deterministic "booked" time slots for a given date */
function getBookedSlots(date: Date | null): Set<string> {
  if (!date) return new Set();
  const set = new Set<string>();
  const day = date.getDate();
  if (day % 3 === 0) set.add("10:00 AM");
  if (day % 4 === 0) set.add("02:00 PM");
  if (day % 5 === 0) set.add("03:30 PM");
  if (day % 6 === 0) set.add("11:00 AM");
  if (day % 7 === 0) set.add("01:00 PM");
  return set;
}

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
};

/* ───────────────────────── Page ───────────────────────── */

export default function SchedulePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [meetingTypeId, setMeetingTypeId] = useState<string | null>(null);
  const [intent, setIntent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", role: "" });
  const [confirmed, setConfirmed] = useState(false);

  const meetingType = useMemo(
    () => MEETING_TYPES.find((m) => m.id === meetingTypeId),
    [meetingTypeId]
  );

  const canProceed =
    (step === 1 && meetingTypeId !== null) ||
    (step === 2 && selectedDate !== null && selectedTime !== null) ||
    (step === 3 && form.name.trim() !== "" && form.email.trim() !== "");

  if (confirmed && meetingType && selectedDate && selectedTime) {
    return (
      <SuccessScreen
        meetingType={meetingType}
        date={selectedDate}
        time={selectedTime}
        form={form}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to home</span>
          </Link>
          <div className="flex items-center gap-2">
            <CalIcon className="w-4 h-4 text-[#4f9ef8]" />
            <span className="text-slate-900 font-semibold text-sm">Book a meeting</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 pt-10 sm:pt-14">
        <ProgressBar step={step} />
      </div>

      {/* Step content */}
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 py-10 sm:py-14 pb-32">
        {step === 1 && (
          <Step1
            selectedId={meetingTypeId}
            onSelect={setMeetingTypeId}
            intent={intent}
            setIntent={setIntent}
          />
        )}
        {step === 2 && (
          <Step2
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        )}
        {step === 3 && (
          <Step3
            form={form}
            setForm={setForm}
            meetingType={meetingType}
            date={selectedDate}
            time={selectedTime}
            intent={intent}
          />
        )}
      </div>

      {/* Sticky footer with nav buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white/95 backdrop-blur border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 h-20 flex items-center justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < 3 ? (
            <button
              disabled={!canProceed}
              onClick={() => setStep((s) => ((s + 1) as 1 | 2 | 3))}
              className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_8px_20px_rgba(15,23,42,0.12)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.22)]"
            >
              Continue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              disabled={!canProceed}
              onClick={() => setConfirmed(true)}
              className="group flex items-center gap-2 bg-[#4f9ef8] hover:bg-[#3a8ef0] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_24px_rgba(79,158,248,0.35)] hover:shadow-[0_0_32px_rgba(79,158,248,0.5)]"
            >
              Confirm booking
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

/* ───────────────────────── Progress bar ───────────────────────── */

function ProgressBar({ step }: { step: number }) {
  const steps = ["Meeting Type", "Date & Time", "Your Details"];
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {steps.map((label, i) => {
        const num = i + 1;
        const isActive = step === num;
        const isComplete = step > num;
        return (
          <Fragment key={i}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`relative w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  isComplete
                    ? "bg-slate-900 text-white"
                    : isActive
                    ? "bg-white border-2 border-slate-900 text-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.06)]"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isComplete ? <Check className="w-4 h-4" /> : num}
              </div>
              <span
                className={`text-sm font-semibold hidden sm:inline transition-colors ${
                  isActive ? "text-slate-900" : isComplete ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-slate-200 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-slate-900 transition-all duration-500"
                  style={{ width: isComplete ? "100%" : "0%" }}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Step 1 ───────────────────────── */

function Step1({
  selectedId,
  onSelect,
  intent,
  setIntent,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  intent: string;
  setIntent: (v: string) => void;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.1]">
          What brings you here?
        </h1>
        <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Pick the type of conversation that fits your needs — we&apos;ll tailor the meeting accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
        {MEETING_TYPES.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedId === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`group relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
                isSelected
                  ? "border-slate-900 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.10)]"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              }`}
            >
              {isSelected && (
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
                />
              )}

              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: isSelected ? m.color : "#F1F5F9",
                    color: isSelected ? "#FFFFFF" : "#475569",
                  }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="text-slate-900 text-base sm:text-lg font-bold tracking-tight">
                      {m.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                      <Clock className="w-3 h-3" />
                      {m.duration}
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 focus-within:border-slate-300 focus-within:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all">
        <label className="block text-slate-900 text-sm font-semibold mb-2.5">
          Tell us a bit more
          <span className="text-slate-400 font-normal ml-2">(optional)</span>
        </label>
        <textarea
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="Briefly describe what you'd like to discuss — your project, goals, current stack, or anything else useful to know upfront."
          rows={3}
          className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}

/* ───────────────────────── Step 2 ───────────────────────── */

function Step2({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (t: string | null) => void;
}) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const bookedDates = useMemo(() => getBookedDates(year, month), [year, month]);
  const bookedSlots = useMemo(() => getBookedSlots(selectedDate), [selectedDate]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const goPrev = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };
  const goNext = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const isPrevDisabled = year === today.getFullYear() && month <= today.getMonth();

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.1]">
          Pick a date &amp; time
        </h1>
        <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          All times shown are in your local timezone. Booked slots are marked.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 sm:gap-6">

        {/* Calendar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 md:p-8">

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goPrev}
              disabled={isPrevDisabled}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h3 className="text-slate-900 text-lg sm:text-xl font-bold tracking-tight">
              {MONTHS[month]} {year}
            </h3>
            <button
              onClick={goNext}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="text-center text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider py-2"
              >
                <span className="sm:hidden">{d[0]}</span>
                <span className="hidden sm:inline">{d}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} className="aspect-square" />;

              const date = new Date(year, month, d);
              date.setHours(0, 0, 0, 0);
              const isPast = date < today;
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isBooked = bookedDates.has(d);
              const isToday = date.getTime() === today.getTime();
              const isSelected = selectedDate?.getTime() === date.getTime();
              const disabled = isPast || isBooked || isWeekend;

              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className={`relative aspect-square rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.25)] scale-[1.04]"
                      : isBooked
                      ? "bg-red-50 text-red-400 cursor-not-allowed"
                      : isToday
                      ? "ring-1 ring-[#4f9ef8] text-[#4f9ef8] hover:bg-blue-50"
                      : disabled
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-700 hover:bg-slate-100 hover:scale-[1.03]"
                  }`}
                >
                  {d}
                  {isBooked && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full ring-1 ring-[#4f9ef8]" />
              <span className="text-slate-500">Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-900" />
              <span className="text-slate-500">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-100 ring-1 ring-red-300" />
              <span className="text-slate-500">Booked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span className="text-slate-500">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-slate-900 text-sm font-bold tracking-tight">
              {selectedDate ? "Available times" : "Pick a date first"}
            </h3>
          </div>

          {selectedDate && (
            <div className="mb-4 pb-4 border-b border-slate-100">
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.16em]">
                {DAY_LABELS[selectedDate.getDay()]}
              </p>
              <p className="text-slate-900 font-bold mt-1">
                {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()},{" "}
                {selectedDate.getFullYear()}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => {
              const isBooked = bookedSlots.has(slot);
              const isSelected = selectedTime === slot;
              const disabled = !selectedDate || isBooked;

              return (
                <button
                  key={slot}
                  disabled={disabled}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-3 py-2.5 rounded-lg text-[13px] font-semibold border transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-[0_4px_12px_rgba(15,23,42,0.2)]"
                      : isBooked
                      ? "border-slate-100 text-slate-300 line-through cursor-not-allowed bg-slate-50/40"
                      : !selectedDate
                      ? "border-slate-100 text-slate-300 cursor-not-allowed"
                      : "border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Step 3 ───────────────────────── */

function Step3({
  form,
  setForm,
  meetingType,
  date,
  time,
  intent,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  meetingType: MeetingType | undefined;
  date: Date | null;
  time: string | null;
  intent: string;
}) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-slate-900 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.1]">
          Almost there
        </h1>
        <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Tell us about yourself, then confirm your booking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 sm:gap-6">

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5">

          <Field label="Full name" icon={User} required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/[0.05] transition-all"
            />
          </Field>

          <Field label="Email address" icon={Mail} required>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jane@company.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/[0.05] transition-all"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Company" icon={Building2}>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Acme Inc."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/[0.05] transition-all"
              />
            </Field>
            <Field label="Role" icon={Pencil}>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Product Manager"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/[0.05] transition-all"
              />
            </Field>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/60 border border-blue-100">
            <ShieldCheck className="w-5 h-5 text-[#4f9ef8] flex-shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <p className="text-slate-900 text-sm font-semibold">Your details are safe</p>
              <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                We&apos;ll use your information only to confirm and prepare for your meeting.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 h-fit lg:sticky lg:top-24">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
            Meeting Summary
          </div>
          <div className="space-y-3.5">
            <SummaryRow
              icon={meetingType?.icon}
              label="Type"
              value={meetingType?.title}
              color={meetingType?.color}
            />
            <SummaryRow
              icon={CalIcon}
              label="Date"
              value={
                date
                  ? `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
                  : "—"
              }
            />
            <SummaryRow icon={Clock} label="Time" value={time || "—"} />
            <SummaryRow icon={Clock} label="Duration" value={meetingType?.duration} />
          </div>
          {intent && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-2">
                Notes
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{intent}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Sub-components ───────────────────────── */

function Field({
  label,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  icon: LucideIcon;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-slate-700 text-sm font-semibold mb-2">
        <Icon className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
        {label}
        {required && <span className="text-[#4f9ef8]">*</span>}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon | undefined;
  label: string;
  value: string | undefined;
  color?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: color ? `${color}22` : "#F1F5F9",
          color: color || "#475569",
        }}
      >
        {Icon && <Icon className="w-4 h-4" strokeWidth={1.8} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
          {label}
        </div>
        <div className="text-slate-900 text-sm font-semibold mt-0.5 truncate">
          {value || "—"}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Success ───────────────────────── */

function SuccessScreen({
  meetingType,
  date,
  time,
  form,
}: {
  meetingType: MeetingType;
  date: Date;
  time: string;
  form: FormState;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-5 py-12">
      <div className="max-w-xl w-full text-center">
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-6">
          <span className="absolute inset-0 rounded-full ring-1 ring-green-200" />
          <Check className="w-10 h-10 text-green-600" strokeWidth={2.5} />
        </div>
        <h1 className="text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
          You&apos;re booked!
        </h1>
        <p className="text-slate-500 mt-3 text-base sm:text-lg leading-relaxed">
          A confirmation has been sent to{" "}
          <span className="font-semibold text-slate-700">{form.email}</span>. We&apos;re looking
          forward to chatting.
        </p>

        <div className="mt-8 p-6 rounded-2xl border border-slate-200 bg-white text-left space-y-4">
          <SummaryRow
            icon={meetingType.icon}
            label="Meeting"
            value={meetingType.title}
            color={meetingType.color}
          />
          <SummaryRow
            icon={CalIcon}
            label="Date"
            value={`${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
          />
          <SummaryRow icon={Clock} label="Time" value={`${time} · ${meetingType.duration}`} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Back to home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
          >
            Book another meeting
          </button>
        </div>
      </div>
    </div>
  );
}
