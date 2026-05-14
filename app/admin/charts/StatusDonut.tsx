"use client";

import { useEffect, useState } from "react";

export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

/**
 * Animated donut chart — arcs grow from 0 to their value with stagger,
 * hover lifts the segment outward + glows, center shows total.
 */
export default function StatusDonut({
  segments,
  size = 220,
  thickness = 18,
}: {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const radius = size / 2 - thickness / 2 - 8;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((a, b) => a + b.value, 0);
  const denom = total || 1;

  // Build cumulative offsets purely — each segment starts where the prior ended.
  const arcs = segments.map((s) => (s.value / denom) * circumference);
  const segs = segments.map((s, i) => ({
    ...s,
    frac: s.value / denom,
    arc: arcs[i],
    startOffset: arcs.slice(0, i).reduce((sum, a) => sum + a, 0),
  }));

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          {segs.map((s, i) => (
            <linearGradient
              key={i}
              id={`donut-${i}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity="0.75" />
              <stop offset="100%" stopColor={s.color} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>

        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(15, 23, 42, 0.04)"
          strokeWidth={thickness}
        />

        {/* Segments */}
        {segs.map((s, i) => {
          if (s.value === 0) return null;
          const isHover = hover === i;

          const dashArray = mounted
            ? `${s.arc - 6} ${circumference}` // -6 px to leave a tiny gap between rounded ends
            : `0 ${circumference}`;
          const dashOffset = -s.startOffset;

          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={center}
                cy={center}
                r={isHover ? radius + 5 : radius}
                fill="none"
                stroke={`url(#donut-${i})`}
                strokeWidth={isHover ? thickness + 3 : thickness}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
                style={{
                  transition: `stroke-dasharray ${1.2 + i * 0.1}s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.18}s, r 0.25s cubic-bezier(0.22, 1, 0.36, 1), stroke-width 0.25s cubic-bezier(0.22, 1, 0.36, 1)`,
                  filter: isHover
                    ? `drop-shadow(0 0 12px ${s.color}88)`
                    : undefined,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          animation:
            "chart-area-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both",
        }}
      >
        {hover !== null && segs[hover] ? (
          <>
            <span
              className="text-[2.4rem] font-bold tracking-tight tabular-nums leading-none transition-colors"
              style={{ color: segs[hover].color }}
            >
              {segs[hover].value}
            </span>
            <span className="mt-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-500">
              {segs[hover].label}
            </span>
            <span className="mt-0.5 text-[10px] tabular-nums text-slate-400">
              {Math.round(segs[hover].frac * 100)}% of total
            </span>
          </>
        ) : (
          <>
            <span className="text-[2.6rem] font-bold tracking-tight tabular-nums leading-none text-slate-900">
              {total}
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400">
              Total bookings
            </span>
          </>
        )}
      </div>
    </div>
  );
}
