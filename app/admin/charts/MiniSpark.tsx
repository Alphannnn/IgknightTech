"use client";

import { useMemo } from "react";

/**
 * Tiny inline sparkline for KPI tiles. Smooth bezier, gradient fill,
 * animated stroke draw + glowing endpoint dot.
 */
export default function MiniSpark({
  values,
  color = "#2783ED",
  height = 36,
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  const W = 120;
  const H = height;
  const padding = 4;
  const innerW = W - padding * 2;
  const innerH = H - padding * 2;

  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = Math.max(max - min, 1);

  const points = useMemo(() => {
    if (values.length === 0) return [];
    const stepX = values.length > 1 ? innerW / (values.length - 1) : innerW;
    return values.map((v, i) => ({
      x: padding + i * stepX,
      y: padding + (1 - (v - min) / range) * innerH,
    }));
  }, [values, innerW, innerH, range, min]);

  if (points.length === 0) return null;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = prev.x + (curr.x - prev.x) / 2;
    path += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const last = points[points.length - 1];
  const areaPath = `${path} L ${last.x} ${H} L ${points[0].x} ${H} Z`;

  const gradId = `spark-${color.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`${gradId}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={areaPath}
        fill={`url(#${gradId}-fill)`}
        style={{
          animation: "chart-area-fade 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
        }}
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          {
            strokeDasharray: 400,
            strokeDashoffset: 400,
            animation: "chart-line-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards",
            ["--chart-dash-length" as string]: "400",
          } as React.CSSProperties
        }
      />
      {/* Glowing endpoint */}
      <circle
        cx={last.x}
        cy={last.y}
        r="4"
        fill={color}
        opacity="0.4"
        style={{
          transformOrigin: `${last.x}px ${last.y}px`,
          animation: "chart-pulse-ring 1.8s ease-out infinite",
        }}
      />
      <circle cx={last.x} cy={last.y} r="2.4" fill={color} />
      <circle cx={last.x} cy={last.y} r="1.2" fill="white" />
    </svg>
  );
}
