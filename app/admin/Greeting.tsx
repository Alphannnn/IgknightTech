"use client";

import { useEffect, useState } from "react";

/**
 * Renders a time-of-day greeting + a live "HH:MM" clock based on the
 * viewer's local timezone. The server renders a neutral default so the
 * initial paint matches; the real values are populated after mount.
 *
 * No fake data — everything here is computed from the user's actual clock.
 */
export default function Greeting() {
  const [mounted, setMounted] = useState(false);
  const [phrase, setPhrase] = useState("Welcome back");
  const [clock, setClock] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      let p: string;
      if (h < 5) p = "Working late";
      else if (h < 12) p = "Good morning";
      else if (h < 17) p = "Good afternoon";
      else if (h < 21) p = "Good evening";
      else p = "Burning the midnight oil";
      setPhrase(p);
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      setClock(`${hh}:${mm}`);
    };
    update();
    // Syncing from the system clock — an external system. Intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Tick every 30s so the clock stays accurate without re-render storms.
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <span suppressHydrationWarning>{phrase}</span>
      {mounted && clock && (
        <span
          suppressHydrationWarning
          className="ml-3 inline-flex items-center text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md tabular-nums tracking-wider"
          title="Your local time"
          aria-label={`Current local time ${clock}`}
        >
          {clock}
        </span>
      )}
    </>
  );
}
