"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/**
 * Reveals an element once it scrolls into view.
 * Returns [ref, visible] tuple — keeps the `react-hooks/refs` lint rule happy
 * (it flags object property access like `obj.ref` thinking it's `.current`).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}): [RefObject<T | null>, boolean] {
  const elRef = useRef<T>(null);
  // Must match between server and client first render, so start false on both.
  // The effect below flips to true on intersection — or unconditionally if the
  // browser lacks IntersectionObserver, so content never stays hidden.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return [elRef, visible];
}

/**
 * Counts up from 0 to a numeric target once `visible` flips to true.
 * Handles "500+", "99.9%", "10M+" — preserves any non-digit prefix/suffix.
 * Non-numeric values (e.g. "Ongoing") just pass through.
 */
export function useCountUp(
  target: string,
  options?: { duration?: number; visible?: boolean },
): string {
  const { duration = 1400, visible = true } = options ?? {};

  // Parse "500+" → { prefix: "", num: 500, suffix: "+", isFloat: false }
  const parsed = (() => {
    const m = target.match(/^(\D*)([\d.]+)(\D*)$/);
    if (!m) return null;
    return {
      prefix: m[1],
      end: parseFloat(m[2]),
      suffix: m[3],
      isFloat: m[2].includes("."),
    };
  })();

  // If non-numeric, render target as-is. Initial state is "0" with suffix
  // when numeric and visible-not-yet-fired, target otherwise.
  const initial = (() => {
    if (!parsed) return target;
    if (!visible) return target; // pre-mount or SSR — render final value
    return `${parsed.prefix}${parsed.isFloat ? "0.0" : "0"}${parsed.suffix}`;
  })();

  const [value, setValue] = useState<string>(initial);

  useEffect(() => {
    if (!parsed || !visible) return;

    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = eased * parsed.end;
      const formatted = parsed.isFloat
        ? current.toFixed(1)
        : Math.round(current).toString();
      setValue(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, duration, target]);

  return value;
}
