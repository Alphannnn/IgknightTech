"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smoothly counts up from 0 to `value` on mount.
 * Uses requestAnimationFrame with an ease-out-cubic curve.
 *
 * Renders an inline <span>; safe to drop inside any element. Avoids
 * hydration mismatches because the server always renders 0 and the
 * count-up only runs after mount.
 */
export default function AnimatedNumber({
  value,
  duration = 900,
  delay = 0,
}: {
  value: number;
  /** Total animation duration in ms. */
  duration?: number;
  /** Delay before animation begins, in ms. */
  delay?: number;
}) {
  const [n, setN] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Syncing state from requestAnimationFrame — an external animation
    // clock. setState calls are inside the rAF callback, not the effect
    // body itself, but the lint rule still flags the reset below.
    if (value === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(0);
      return;
    }
    let startTs = 0;
    const tick = (t: number) => {
      if (!startTs) startTs = t;
      const elapsed = t - startTs - delay;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setN(Math.round(value * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, delay]);

  return <span suppressHydrationWarning>{n}</span>;
}
