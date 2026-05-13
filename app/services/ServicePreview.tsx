"use client";

import { type Service } from "./services-data";

/**
 * ServicePreview — a stylized illustration that visually anchors each
 * service card. Fills its parent (which controls the aspect ratio).
 *
 * Pure CSS/SVG. Service color flows through tints, accent strokes, and
 * a corner glow.
 */
export function ServicePreview({
  service,
  rounded = "rounded-2xl",
}: {
  service: Service;
  rounded?: string;
}) {
  const c = service.color;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${rounded}`}
      style={{
        background: `linear-gradient(135deg, ${c}14 0%, ${c}06 60%, transparent 100%)`,
      }}
    >
      {/* Ambient corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }}
      />

      {/* Soft grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(${c}0F 1px, transparent 1px), linear-gradient(90deg, ${c}0F 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      {/* Service-specific illustration */}
      <div className="absolute inset-0">
        {service.id === "custom-software" && <ArchitecturePreview color={c} />}
        {service.id === "web-development" && <BrowserPreview color={c} />}
        {service.id === "mobile-apps" && <PhonePreview color={c} />}
        {service.id === "ai-data" && <NeuralPreview color={c} />}
        {service.id === "cloud-devops" && <CloudPreview color={c} />}
        {service.id === "product-design" && <DesignPreview color={c} />}
      </div>
    </div>
  );
}

/* ───────────────────────── Custom Software — Architecture layers ───────────────────────── */

function ArchitecturePreview({ color }: { color: string }) {
  const layers = [
    { label: "UI",   bars: 4, opacity: 1.0 },
    { label: "API",  bars: 5, opacity: 0.85 },
    { label: "Data", bars: 3, opacity: 0.7 },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 px-7 sm:px-10 py-7">
      {layers.map((l, i) => (
        <div
          key={l.label}
          className="relative rounded-xl border backdrop-blur-sm transition-transform duration-500 group-hover:translate-x-1"
          style={{
            background: `${color}${i === 0 ? "1F" : i === 1 ? "14" : "0E"}`,
            borderColor: `${color}30`,
            transitionDelay: `${i * 60}ms`,
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
              {l.label}
            </span>
            <div className="flex-1 flex gap-1.5">
              {Array.from({ length: l.bars }).map((_, j) => (
                <span
                  key={j}
                  className="h-1.5 rounded-full"
                  style={{
                    background: `${color}${j === 0 ? "55" : "33"}`,
                    width: `${18 + (j * 7) % 30}px`,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Vertical connector to next layer */}
          {i < layers.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-8 -bottom-3 w-px h-3"
              style={{ background: `${color}40` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── Web Development — Browser + Lighthouse score ───────────────────────── */

function BrowserPreview({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 p-5 sm:p-7 flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: `${color}60` }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: `${color}40` }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: `${color}30` }} />
        <div
          className="ml-3 flex-1 h-5 rounded-md flex items-center px-2.5 font-mono text-[10px] text-slate-700"
          style={{
            background: `${color}12`,
            border: `1px solid ${color}25`,
          }}
        >
          igknight.tech
        </div>
      </div>

      {/* Content area */}
      <div
        className="flex-1 rounded-xl flex items-center justify-center relative overflow-hidden"
        style={{
          background: `${color}0C`,
          border: `1px solid ${color}22`,
        }}
      >
        {/* Lighthouse-style ring */}
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 transition-transform duration-700 group-hover:rotate-6">
          <circle cx="50" cy="50" r="42" fill="none" stroke={`${color}25`} strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="6"
            transform="rotate(-90 50 50)"
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fill={color}
            fontFamily="ui-sans-serif, system-ui"
          >
            98
          </text>
        </svg>
        <span className="absolute bottom-3 right-3 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
          Lighthouse
        </span>
      </div>
    </div>
  );
}

/* ───────────────────────── Mobile Apps — Two phone frames ───────────────────────── */

function PhonePreview({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center pt-4">
      {/* Back phone */}
      <div
        className="relative w-[34%] h-[78%] rounded-[18px] -mr-6 sm:-mr-8 rotate-[-8deg] origin-bottom-right transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:-translate-x-1"
        style={{
          background: `linear-gradient(160deg, ${color}1F, ${color}0A)`,
          border: `1px solid ${color}30`,
          boxShadow: `0 12px 30px -10px ${color}40`,
        }}
      >
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full" style={{ background: `${color}40` }} />
        <div className="p-2 mt-3 space-y-1.5">
          <div className="h-2 rounded" style={{ background: `${color}30`, width: "60%" }} />
          <div className="h-2 rounded" style={{ background: `${color}20`, width: "80%" }} />
        </div>
      </div>

      {/* Front phone */}
      <div
        className="relative w-[40%] h-[88%] rounded-[20px] z-10 rotate-[5deg] origin-bottom-left transition-transform duration-500 group-hover:rotate-[9deg] group-hover:translate-x-1"
        style={{
          background: `linear-gradient(160deg, ${color}26, ${color}0F)`,
          border: `1px solid ${color}40`,
          boxShadow: `0 16px 36px -10px ${color}55`,
        }}
      >
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full" style={{ background: `${color}55` }} />
        <div className="p-2.5 mt-4 space-y-2">
          <div className="h-3 rounded-md" style={{ background: `${color}40`, width: "55%" }} />
          <div className="h-2 rounded" style={{ background: `${color}25`, width: "85%" }} />
          <div className="h-2 rounded" style={{ background: `${color}25`, width: "70%" }} />
          <div className="mt-2 h-8 rounded-lg" style={{ background: `${color}1A`, border: `1px solid ${color}30` }} />
          <div className="h-8 rounded-lg" style={{ background: `${color}1A`, border: `1px solid ${color}30` }} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── AI & Data — Neural network ───────────────────────── */

function NeuralPreview({ color }: { color: string }) {
  const cols = [3, 5, 5, 2];
  return (
    <svg
      viewBox="0 0 240 140"
      className="absolute inset-0 w-full h-full p-5 sm:p-7"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Connections */}
      {cols.slice(0, -1).map((cnt, ci) => {
        const x1 = 30 + ci * 60;
        const x2 = x1 + 60;
        const nextCnt = cols[ci + 1];
        return Array.from({ length: cnt }).flatMap((_, i) =>
          Array.from({ length: nextCnt }).map((_, j) => {
            const y1 = 70 + (i - (cnt - 1) / 2) * 22;
            const y2 = 70 + (j - (nextCnt - 1) / 2) * 22;
            return (
              <line
                key={`${ci}-${i}-${j}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeOpacity={0.18}
                strokeWidth={0.8}
              />
            );
          })
        );
      })}

      {/* Nodes */}
      {cols.map((cnt, ci) =>
        Array.from({ length: cnt }).map((_, i) => {
          const x = 30 + ci * 60;
          const y = 70 + (i - (cnt - 1) / 2) * 22;
          const isOutput = ci === cols.length - 1;
          return (
            <g key={`n-${ci}-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={isOutput ? 6 : 5}
                fill={isOutput ? color : `${color}1F`}
                stroke={color}
                strokeWidth={isOutput ? 0 : 1.2}
              />
            </g>
          );
        })
      )}

      <text
        x="220"
        y="130"
        textAnchor="end"
        fontSize="9"
        fontWeight="800"
        fill="#475569"
        letterSpacing="1.5"
        fontFamily="ui-sans-serif, system-ui"
      >
        INFERENCE
      </text>
    </svg>
  );
}

/* ───────────────────────── Cloud & DevOps — Regions & arcs ───────────────────────── */

function CloudPreview({ color }: { color: string }) {
  const nodes = [
    { x: 60,  y: 70 },
    { x: 120, y: 40 },
    { x: 120, y: 100 },
    { x: 180, y: 70 },
  ];
  return (
    <svg
      viewBox="0 0 240 140"
      className="absolute inset-0 w-full h-full p-5 sm:p-7"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Concentric region arcs */}
      <circle cx="120" cy="70" r="62" fill="none" stroke={`${color}18`} strokeWidth="0.8" />
      <circle cx="120" cy="70" r="44" fill="none" stroke={`${color}24`} strokeWidth="0.8" />
      <circle cx="120" cy="70" r="26" fill="none" stroke={`${color}33`} strokeWidth="0.8" />

      {/* Arcs between nodes */}
      <path d={`M ${nodes[0].x} ${nodes[0].y} Q 90 30 ${nodes[1].x} ${nodes[1].y}`} fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1.1" />
      <path d={`M ${nodes[1].x} ${nodes[1].y} Q 150 30 ${nodes[3].x} ${nodes[3].y}`} fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1.1" />
      <path d={`M ${nodes[3].x} ${nodes[3].y} Q 150 110 ${nodes[2].x} ${nodes[2].y}`} fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1.1" />
      <path d={`M ${nodes[2].x} ${nodes[2].y} Q 90 110 ${nodes[0].x} ${nodes[0].y}`} fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="1.1" />

      {/* Center hub */}
      <circle cx="120" cy="70" r="8" fill={color} />
      <circle cx="120" cy="70" r="14" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="1" />

      {/* Edge nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="6" fill={`${color}26`} stroke={color} strokeWidth="1.2" />
          <circle cx={n.x} cy={n.y} r="2" fill={color} />
        </g>
      ))}

      <text
        x="220"
        y="130"
        textAnchor="end"
        fontSize="9"
        fontWeight="800"
        fill="#475569"
        letterSpacing="1.5"
        fontFamily="ui-sans-serif, system-ui"
      >
        4 REGIONS · 99.99%
      </text>
    </svg>
  );
}

/* ───────────────────────── Product Design — Component & swatches grid ───────────────────────── */

function DesignPreview({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 p-5 sm:p-7 grid grid-cols-3 grid-rows-3 gap-2">
      {/* Color swatches (top row) */}
      {[100, 70, 40].map((alpha, i) => (
        <div
          key={`s-${i}`}
          className="rounded-lg transition-transform duration-500"
          style={{
            background: `${color}${alpha === 100 ? "" : alpha === 70 ? "B3" : "66"}`,
            transitionDelay: `${i * 50}ms`,
          }}
        />
      ))}

      {/* Mock button */}
      <div
        className="rounded-lg flex items-center justify-center text-[10px] font-bold tracking-tight col-span-2"
        style={{
          background: color,
          color: "#fff",
        }}
      >
        Button
      </div>
      {/* Mock badge */}
      <div
        className="rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-700"
        style={{
          background: `${color}1F`,
          border: `1px solid ${color}40`,
        }}
      >
        A
      </div>

      {/* Mock card row */}
      <div
        className="rounded-lg col-span-3 flex items-center gap-2 px-2.5"
        style={{
          background: `${color}0C`,
          border: `1px solid ${color}25`,
        }}
      >
        <span
          className="w-5 h-5 rounded-full"
          style={{ background: `${color}40` }}
        />
        <div className="flex-1 flex flex-col gap-1">
          <span className="h-1.5 rounded" style={{ background: `${color}40`, width: "55%" }} />
          <span className="h-1.5 rounded" style={{ background: `${color}26`, width: "80%" }} />
        </div>
      </div>
    </div>
  );
}
