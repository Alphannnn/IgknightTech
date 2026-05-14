"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

/**
 * Live countdown chip — ticks every 30s, formats nicely for any range
 * (years/months/days/hours/minutes/seconds). For Up Next on the dashboard.
 */
export default function CountdownChip({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // First tick deferred to a microtask so React purity rule sees the
    // initial setNow as async-to-the-effect, not a sync cascade.
    const handle = queueMicrotask
      ? (queueMicrotask(() => setNow(Date.now())), null)
      : setTimeout(() => setNow(Date.now()), 0);
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      if (handle !== null) clearTimeout(handle);
      clearInterval(id);
    };
  }, []);

  if (now === null) {
    // SSR / first paint — render a stable placeholder
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wide text-blue-100/65 tabular-nums">
        <Clock className="w-3 h-3" />
        loading…
      </span>
    );
  }

  const diff = targetMs - now;

  if (diff <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </span>
        Happening now
      </span>
    );
  }

  const totalMin = Math.floor(diff / 60_000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  const minutes = totalMin % 60;

  let text: string;
  if (days >= 1) {
    text = hours > 0 ? `in ${days}d ${hours}h` : `in ${days}d`;
  } else if (hours >= 1) {
    text = minutes > 0 ? `in ${hours}h ${minutes}m` : `in ${hours}h`;
  } else if (minutes >= 1) {
    text = `in ${minutes}m`;
  } else {
    text = "starting soon";
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 tabular-nums">
      <Clock className="w-3 h-3" />
      {text}
    </span>
  );
}
