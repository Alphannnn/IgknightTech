"use client";

import { useMemo, useState } from "react";

export type ChartPoint = { label: string; value: number; iso: string };

/**
 * Animated bookings line chart — smooth bezier, gradient stroke (blue→violet→cyan),
 * gradient area fill, animated stroke draw-in, hover tooltip, pulsing latest dot.
 */
export default function BookingsChart({
  data,
  height = 240,
}: {
  data: ChartPoint[];
  height?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 800;
  const padding = { top: 28, right: 24, bottom: 32, left: 24 };
  const innerW = W - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const max = useMemo(() => Math.max(...data.map((d) => d.value), 1), [data]);

  const points = useMemo(() => {
    if (data.length === 0) return [];
    const stepX = data.length > 1 ? innerW / (data.length - 1) : innerW;
    return data.map((d, i) => ({
      x: padding.left + i * stepX,
      y: padding.top + (1 - d.value / max) * innerH,
      ...d,
    }));
  }, [data, innerW, innerH, max, padding.left, padding.top]);

  // Smooth cubic bezier path
  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    let p = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cx = prev.x + (curr.x - prev.x) / 2;
      p += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return p;
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const last = points[points.length - 1];
    const first = points[0];
    return `${linePath} L ${last.x} ${padding.top + innerH} L ${first.x} ${padding.top + innerH} Z`;
  }, [linePath, points, padding.top, innerH]);

  // Horizontal grid lines
  const gridY = [0.25, 0.5, 0.75].map((p) => padding.top + p * innerH);

  // Latest data point — gets the pulse halo
  const latest = points[points.length - 1];

  const labelStride = Math.max(1, Math.ceil(points.length / 7));

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="bk-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2783ED" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="bk-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2783ED" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="bk-dot-glow">
            <stop offset="0%" stopColor="#2783ED" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2783ED" stopOpacity="0" />
          </radialGradient>
          <filter id="bk-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal grid */}
        {gridY.map((y, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={y}
            x2={W - padding.right}
            y2={y}
            stroke="rgba(15, 23, 42, 0.05)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}

        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#bk-fill)"
          style={{
            animation: "chart-area-fade 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both",
          }}
        />

        {/* Line stroke — animated draw-in */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#bk-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#bk-glow)"
          style={
            {
              strokeDasharray: 2000,
              strokeDashoffset: 2000,
              animation:
                "chart-line-draw 2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards",
              ["--chart-dash-length" as string]: "2000",
            } as React.CSSProperties
          }
        />

        {/* Hover guide line */}
        {hover !== null && points[hover] && (
          <line
            x1={points[hover].x}
            y1={padding.top}
            x2={points[hover].x}
            y2={padding.top + innerH}
            stroke="rgba(15, 23, 42, 0.15)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        )}

        {/* Data points */}
        {points.map((p, i) => {
          const isHover = hover === i;
          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Invisible hover target */}
              <rect
                x={p.x - 20}
                y={padding.top}
                width="40"
                height={innerH}
                fill="transparent"
              />
              {/* Outer ring on hover */}
              {isHover && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="10"
                  fill="url(#bk-dot-glow)"
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHover ? 6 : 4}
                fill="#2783ED"
                stroke="white"
                strokeWidth="2"
                style={{
                  animation: `chart-dot-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.6 + i * 0.04}s both`,
                  transition: "r 0.18s ease-out",
                }}
              />
            </g>
          );
        })}

        {/* Latest dot — pulsing halo */}
        {latest && (
          <>
            <circle
              cx={latest.x}
              cy={latest.y}
              r="8"
              fill="#2783ED"
              opacity="0.6"
              style={{
                animation: "chart-pulse-ring 2s ease-out infinite",
                transformOrigin: `${latest.x}px ${latest.y}px`,
              }}
            />
            <circle
              cx={latest.x}
              cy={latest.y}
              r="14"
              fill="#2783ED"
              opacity="0.3"
              style={{
                animation: "chart-pulse-ring 2s ease-out 0.4s infinite",
                transformOrigin: `${latest.x}px ${latest.y}px`,
              }}
            />
          </>
        )}

        {/* X-axis day labels */}
        {points.map((p, i) => {
          if (i % labelStride !== 0 && i !== points.length - 1) return null;
          return (
            <text
              key={i}
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={i === points.length - 1 ? "#0F172A" : "rgba(15, 23, 42, 0.45)"}
              style={{
                animation: `chart-area-fade 0.5s ease-out ${1.2 + i * 0.02}s both`,
              }}
            >
              {p.label}
            </text>
          );
        })}

        {/* Hover tooltip */}
        {hover !== null && points[hover] && (
          <g
            style={{
              transition: "opacity 0.15s",
            }}
          >
            <rect
              x={points[hover].x - 48}
              y={Math.max(padding.top, points[hover].y - 52)}
              width="96"
              height="38"
              rx="10"
              fill="white"
              stroke="rgba(15, 23, 42, 0.08)"
              filter="drop-shadow(0 8px 24px rgba(15,23,42,0.10))"
            />
            <text
              x={points[hover].x}
              y={Math.max(padding.top, points[hover].y - 52) + 16}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#0F172A"
            >
              {points[hover].value}
            </text>
            <text
              x={points[hover].x}
              y={Math.max(padding.top, points[hover].y - 52) + 30}
              textAnchor="middle"
              fontSize="10"
              fontWeight="500"
              fill="rgba(15, 23, 42, 0.5)"
            >
              {points[hover].iso}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
