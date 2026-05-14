"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   HeroVisual — frameless editorial canvas.
   Each scene "lives" on one side (left or right). On enter it
   slides in from that side; the previous scene exits to the
   opposite side concurrently — like two film frames passing
   each other on a track. No box, no chrome — just art.
   ───────────────────────────────────────────────────────────── */

type SceneId = "nexus" | "prism" | "trajectory" | "orbit";
type SceneSide = "left" | "right";

const SCENES: {
  id: SceneId;
  label: string;
  caption: string;
  stat: string;
  side: SceneSide;
}[] = [
  { id: "nexus",      label: "01 / NEXUS",      caption: "Interconnected practice", stat: "11 nodes · 19 edges",  side: "right" },
  { id: "prism",      label: "02 / PRISM",      caption: "Structured precision",    stat: "06 facets · ø 1.618",  side: "left"  },
  { id: "trajectory", label: "03 / TRAJECTORY", caption: "Rising velocity",         stat: "v0 → v3 · +320%",      side: "right" },
  { id: "orbit",      label: "04 / ORBIT",      caption: "Patient cycles",          stat: "4 orbits · 8 – 27s",   side: "left"  },
];

const DURATION_MS = 1100;

export default function HeroVisual({
  activeHeadingIndex,
}: {
  activeHeadingIndex: number;
}) {
  const sceneIndex =
    ((activeHeadingIndex % SCENES.length) + SCENES.length) % SCENES.length;

  // Track previous index — used to render the outgoing scene during its exit animation.
  const prevRef = useRef<number>(sceneIndex);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    if (prevRef.current === sceneIndex) return;
    const leaving = prevRef.current;
    prevRef.current = sceneIndex;
    setPreviousIndex(leaving);
    const t = setTimeout(() => setPreviousIndex(null), DURATION_MS + 50);
    return () => clearTimeout(t);
  }, [sceneIndex]);

  const active = SCENES[sceneIndex];

  return (
    <div className="relative w-full max-w-[600px] aspect-square">

      {/* ── Atmospheric backdrop — soft mood, no frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-12 sm:-inset-16 rounded-[50%] blur-3xl opacity-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(58% 54% at 55% 45%, rgba(123,182,255,0.28), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-12 w-44 h-44 rounded-full opacity-55 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #A78BFA, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7BB6FF, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-16 w-32 h-32 rounded-full opacity-40 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #67E8F9, transparent 70%)" }}
      />

      {/* ── Scene stage — frameless, with overflow contained by parent section */}
      <div className="absolute inset-0 overflow-visible">

        {/* Outgoing scene */}
        {previousIndex !== null && previousIndex !== sceneIndex && (
          <SceneFrame
            key={`exit-${previousIndex}-${sceneIndex}`}
            sceneId={SCENES[previousIndex].id}
            animation={
              SCENES[previousIndex].side === "left"
                ? "hero-slide-out-left"
                : "hero-slide-out-right"
            }
            ariaHidden
          />
        )}

        {/* Incoming / active scene */}
        <SceneFrame
          key={`enter-${sceneIndex}`}
          sceneId={active.id}
          animation={
            active.side === "left"
              ? "hero-slide-in-left"
              : "hero-slide-in-right"
          }
        />
      </div>

      {/* ── Floating editorial caption — minimal, no box */}
      <FloatingCaption sceneIndex={sceneIndex} />

      {/* ── Live indicator — top right, free-floating */}
      <div className="absolute -top-1 right-0 flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-white/45 uppercase pointer-events-none z-20">
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </span>
        Live
      </div>

      {/* ── Side-of-entry whisper — tiny tick on the entry side */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 pointer-events-none z-10"
        style={{
          left: active.side === "left" ? "-22px" : "auto",
          right: active.side === "right" ? "-22px" : "auto",
        }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="w-px h-5 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
          <span className="w-1 h-1 rounded-full bg-[#7BB6FF]" />
          <span className="w-px h-5 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

/* ── Animated wrapper around a single scene ── */
function SceneFrame({
  sceneId,
  animation,
  ariaHidden = false,
}: {
  sceneId: SceneId;
  animation: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="absolute inset-0 will-change-transform"
      style={{
        animation: `${animation} ${DURATION_MS}ms cubic-bezier(0.32, 0.72, 0, 1) both`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ animation: "scene-drift 7s ease-in-out infinite" }}
      >
        {sceneId === "nexus" && <NexusScene />}
        {sceneId === "prism" && <PrismScene />}
        {sceneId === "trajectory" && <TrajectoryScene />}
        {sceneId === "orbit" && <OrbitScene />}
      </div>
    </div>
  );
}

/* ── Floating caption — no container, just type that swaps with scene ── */
function FloatingCaption({ sceneIndex }: { sceneIndex: number }) {
  return (
    <>
      {/* Scene label — top-left, free-floating */}
      <div className="absolute -top-1 left-0 h-5 overflow-hidden pointer-events-none z-20">
        {SCENES.map((s, i) => (
          <span
            key={s.id}
            className="absolute left-0 top-0 font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-[#7BB6FF] whitespace-nowrap transition-all duration-700"
            style={{
              opacity: i === sceneIndex ? 1 : 0,
              transform:
                i === sceneIndex ? "translateY(0)" : "translateY(-110%)",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: i === sceneIndex ? "200ms" : "0ms",
            }}
          >
            {s.label}
          </span>
        ))}
      </div>

      {/* Caption + stat — bottom-left, free-floating */}
      <div className="absolute -bottom-2 left-0 right-0 flex items-end justify-between gap-4 pointer-events-none z-20">
        <div className="relative h-9 overflow-hidden flex-1">
          {SCENES.map((s, i) => (
            <div
              key={s.id}
              className="absolute left-0 bottom-0 transition-all duration-700"
              style={{
                opacity: i === sceneIndex ? 1 : 0,
                transform:
                  i === sceneIndex ? "translateY(0)" : "translateY(115%)",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: i === sceneIndex ? "260ms" : "0ms",
              }}
            >
              <div className="text-white text-[13px] sm:text-[14px] font-medium tracking-tight whitespace-nowrap">
                {s.caption}
              </div>
              <div className="mt-0.5 font-mono text-[10px] sm:text-[11px] tracking-[0.20em] text-white/45 uppercase whitespace-nowrap">
                {s.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Index ticker */}
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-white/35 whitespace-nowrap">
          <span className="text-white/75 transition-colors duration-500">
            {String(sceneIndex + 1).padStart(2, "0")}
          </span>
          <span>{" / "}</span>
          <span>{String(SCENES.length).padStart(2, "0")}</span>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 1: NEXUS — dense connected network with multi-pulse,
   satellites, and a faint background data field
   ═══════════════════════════════════════════════════════════════ */
function NexusScene() {
  // 11 nodes — denser, asymmetric, intentional layout
  const NODES = [
    { x: 100, y: 100, r: 9,   accent: true,  label: "core" },
    { x: 40,  y: 48,  r: 4,   sub: true                     },
    { x: 156, y: 36,  r: 5,   secondary: true               },
    { x: 178, y: 92,  r: 3.5                                },
    { x: 174, y: 138, r: 4.5, secondary: true               },
    { x: 144, y: 174, r: 3.5                                },
    { x: 90,  y: 172, r: 4,   sub: true                     },
    { x: 42,  y: 158, r: 4.5                                },
    { x: 22,  y: 110, r: 3.5, secondary: true               },
    { x: 60,  y: 84,  r: 3                                  },
    { x: 130, y: 78,  r: 3.5                                },
  ];
  const EDGES: [number, number][] = [
    [0, 1], [0, 2], [0, 4], [0, 6], [0, 8], [0, 10],
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [7, 8], [8, 1], [9, 0], [9, 1], [10, 0], [10, 3],
    [10, 2],
  ];

  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-4 sm:p-6">
      <defs>
        <radialGradient id="nx-core">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor="#7BB6FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nx-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* Background data-field specks (wider area than nodes) */}
      {Array.from({ length: 36 }).map((_, i) => {
        const seed = i * 137.5;
        const x = ((seed * 3.7) % 200);
        const y = ((seed * 5.3) % 200);
        const r = 0.4 + ((seed * 0.13) % 0.6);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill="rgba(255,255,255,0.18)"
          />
        );
      })}

      {/* Slow rotating outer network group */}
      <g style={{ transformOrigin: "100px 100px", animation: "orbit-spin 80s linear infinite" }}>
        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={i % 4 === 0 ? "rgba(123,182,255,0.35)" : "rgba(255,255,255,0.13)"}
            strokeWidth={i % 4 === 0 ? "0.6" : "0.4"}
            strokeDasharray={i % 3 === 0 ? "1.5 3" : undefined}
          />
        ))}

        {/* Traveling pulses on multiple edges, different colors + speeds */}
        <circle r="2.2" fill="#7BB6FF">
          <animateMotion dur="3.2s" repeatCount="indefinite"
            path={`M${NODES[0].x},${NODES[0].y} L${NODES[2].x},${NODES[2].y}`} />
        </circle>
        <circle r="2" fill="#A78BFA">
          <animateMotion dur="4.4s" repeatCount="indefinite" begin="0.8s"
            path={`M${NODES[0].x},${NODES[0].y} L${NODES[6].x},${NODES[6].y}`} />
        </circle>
        <circle r="2" fill="#67E8F9">
          <animateMotion dur="5.6s" repeatCount="indefinite" begin="1.6s"
            path={`M${NODES[0].x},${NODES[0].y} L${NODES[4].x},${NODES[4].y}`} />
        </circle>
        <circle r="1.6" fill="#FCD34D">
          <animateMotion dur="6.8s" repeatCount="indefinite" begin="2.4s"
            path={`M${NODES[0].x},${NODES[0].y} L${NODES[8].x},${NODES[8].y}`} />
        </circle>

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={i}>
            {n.accent && (
              <>
                <circle cx={n.x} cy={n.y} r={n.r + 14} fill="url(#nx-core)" opacity="0.55" />
                <circle cx={n.x} cy={n.y} r={n.r + 8} fill="none" stroke="rgba(123,182,255,0.45)" strokeWidth="0.5">
                  <animate attributeName="r" values={`${n.r + 8};${n.r + 20};${n.r + 8}`} dur="3.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="3.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={n.x} cy={n.y} r={n.r + 16} fill="none" stroke="rgba(123,182,255,0.3)" strokeWidth="0.4">
                  <animate attributeName="r" values={`${n.r + 16};${n.r + 28};${n.r + 16}`} dur="3.4s" repeatCount="indefinite" begin="1s" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="3.4s" repeatCount="indefinite" begin="1s" />
                </circle>
              </>
            )}
            {n.secondary && (
              <circle cx={n.x} cy={n.y} r={n.r + 3} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={
                n.accent
                  ? "#7BB6FF"
                  : n.secondary
                  ? "#CDE2FE"
                  : n.sub
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.55)"
              }
            />
            {n.accent && (
              <circle cx={n.x - 1.5} cy={n.y - 1.5} r={n.r - 4} fill="rgba(255,255,255,0.9)" />
            )}
            {/* Tiny satellite dot orbiting some sub nodes */}
            {n.sub && (
              <g style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: `orbit-spin ${5 + (i * 0.7)}s linear infinite` }}>
                <circle cx={n.x + n.r + 3.5} cy={n.y} r="0.9" fill="rgba(255,255,255,0.9)" />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* Foreground crosshair tick on center */}
      <g opacity="0.55">
        <line x1="86" y1="100" x2="92" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <line x1="108" y1="100" x2="114" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <line x1="100" y1="86" x2="100" y2="92" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <line x1="100" y1="108" x2="100" y2="114" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 2: PRISM — dual rotating hexagonal forms, iridescent core,
   refracted rays, depth via offset frame
   ═══════════════════════════════════════════════════════════════ */
function PrismScene() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-2 sm:p-4">
      <defs>
        <linearGradient id="prism-ray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7BB6FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="prism-core">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="35%" stopColor="#CDE2FE" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#7BB6FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="prism-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(123,182,255,0.7)" />
          <stop offset="50%" stopColor="rgba(167,139,250,0.5)" />
          <stop offset="100%" stopColor="rgba(103,232,249,0.7)" />
        </linearGradient>
      </defs>

      {/* Background sparse specks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const seed = i * 211.3;
        const x = ((seed * 4.1) % 200);
        const y = ((seed * 7.3) % 200);
        return (
          <circle key={i} cx={x} cy={y} r="0.5" fill="rgba(255,255,255,0.18)" />
        );
      })}

      {/* Outer hexagon — slow rotation */}
      <g style={{ transformOrigin: "100px 100px", animation: "orbit-spin 36s linear infinite" }}>
        <polygon
          points="60,68 140,68 162,108 140,148 60,148 38,108"
          fill="none"
          stroke="url(#prism-edge)"
          strokeWidth="0.9"
        />
        {/* Spokes from center to each vertex */}
        {[[60, 68], [140, 68], [162, 108], [140, 148], [60, 148], [38, 108]].map(([x, y], i) => (
          <line key={i} x1="100" y1="108" x2={x} y2={y} stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
        ))}
        {/* Vertex markers */}
        {[[60, 68], [140, 68], [162, 108], [140, 148], [60, 148], [38, 108]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="2.2" fill="#143A8E" stroke="rgba(255,255,255,0.7)" strokeWidth="0.6" />
            <circle cx={x} cy={y} r="0.9" fill="#fff" />
          </g>
        ))}
        {/* Subtle facet highlights — triangular accents */}
        <polygon points="100,108 60,68 140,68" fill="rgba(123,182,255,0.05)" />
        <polygon points="100,108 140,148 60,148" fill="rgba(167,139,250,0.05)" />
      </g>

      {/* Inner offset hexagon — counter-rotates */}
      <g style={{ transformOrigin: "100px 108px", animation: "orbit-spin 24s linear infinite reverse" }}>
        <polygon
          points="80,86 120,86 132,108 120,130 80,130 68,108"
          fill="none"
          stroke="rgba(123,182,255,0.55)"
          strokeWidth="0.7"
          strokeDasharray="2 3"
        />
        {/* Inner vertex pips */}
        {[[80, 86], [120, 86], [132, 108], [120, 130], [80, 130], [68, 108]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.3" fill="rgba(255,255,255,0.9)" />
        ))}
      </g>

      {/* Rays — emerging from core, varying lengths, counter-rotate slowly */}
      <g style={{ transformOrigin: "100px 108px", animation: "orbit-spin 20s linear infinite reverse" }}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const len = i % 2 === 0 ? 80 : 56;
          const x2 = 100 + Math.cos(rad) * len;
          const y2 = 108 + Math.sin(rad) * len;
          return (
            <line
              key={angle}
              x1="100"
              y1="108"
              x2={x2}
              y2={y2}
              stroke="url(#prism-ray)"
              strokeWidth={i % 2 === 0 ? "0.7" : "0.5"}
              opacity={i % 2 === 0 ? "0.55" : "0.35"}
            />
          );
        })}
      </g>

      {/* Central iridescent core */}
      <circle cx="100" cy="108" r="20" fill="url(#prism-core)" opacity="0.7">
        <animate attributeName="opacity" values="0.55;0.95;0.55" dur="3.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="108" r="6" fill="#fff" opacity="0.95" />
      <circle cx="98" cy="106" r="2" fill="#fff" />

      {/* Outer pulse rings */}
      <circle cx="100" cy="108" r="46" fill="none" stroke="rgba(123,182,255,0.5)" strokeWidth="0.5">
        <animate attributeName="r" values="46;76;46" dur="4.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="4.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="108" r="38" fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth="0.5">
        <animate attributeName="r" values="38;68;38" dur="4.6s" repeatCount="indefinite" begin="1.5s" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="4.6s" repeatCount="indefinite" begin="1.5s" />
      </circle>

      {/* Spec readouts — tiny floating numerals */}
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fill="rgba(255,255,255,0.5)" fontSize="6" letterSpacing="0.1em">
        <text x="30" y="40">φ 1.618</text>
        <text x="146" y="40">06 / FACETS</text>
        <text x="30" y="186">REFRACTION INDEX</text>
        <text x="146" y="186" textAnchor="start">+0.812</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 3: TRAJECTORY — main curve + ghost prediction, particles
   trailing the marker, vector field, milestone labels
   ═══════════════════════════════════════════════════════════════ */
function TrajectoryScene() {
  const MAIN_PATH = "M 22 175 Q 80 175, 105 110 T 178 26";
  const GHOST_PATH = "M 22 178 Q 86 178, 116 132 T 178 56";

  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-4 sm:p-6">
      <defs>
        <linearGradient id="traj-main" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7BB6FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#CDE2FE" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="traj-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7BB6FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="traj-burst">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="50%" stopColor="#7BB6FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Horizontal grid lines with mono labels */}
      <g opacity="0.5">
        {[40, 80, 120, 160].map((y) => (
          <line
            key={y}
            x1="10"
            y1={y}
            x2="194"
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="1.5 3"
            strokeWidth="0.5"
          />
        ))}
      </g>
      {[
        { y: 40,  label: "v3" },
        { y: 80,  label: "v2" },
        { y: 120, label: "v1" },
        { y: 160, label: "v0" },
      ].map((m) => (
        <text
          key={m.label}
          x="10"
          y={m.y - 2}
          fontSize="6"
          fill="rgba(255,255,255,0.4)"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          letterSpacing="0.12em"
        >
          {m.label}
        </text>
      ))}

      {/* Vector field — tiny up-right arrows in background */}
      <g opacity="0.22">
        {Array.from({ length: 18 }).map((_, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          const x = 32 + col * 28;
          const y = 60 + row * 38;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x + 4} y2={y - 4} stroke="rgba(123,182,255,0.7)" strokeWidth="0.5" />
              <line x1={x + 4} y1={y - 4} x2={x + 2.5} y2={y - 4} stroke="rgba(123,182,255,0.7)" strokeWidth="0.5" />
              <line x1={x + 4} y1={y - 4} x2={x + 4} y2={y - 2.5} stroke="rgba(123,182,255,0.7)" strokeWidth="0.5" />
            </g>
          );
        })}
      </g>

      {/* Fill under main curve */}
      <path d={`${MAIN_PATH} L 178 195 L 22 195 Z`} fill="url(#traj-fill)" opacity="0.45" />

      {/* Ghost prediction curve */}
      <path d={GHOST_PATH} fill="none" stroke="rgba(167,139,250,0.45)" strokeWidth="0.9" strokeDasharray="2 4" />

      {/* Main curve */}
      <path d={MAIN_PATH} fill="none" stroke="url(#traj-main)" strokeWidth="1.6" strokeLinecap="round" />

      {/* Milestone markers with labels */}
      {[
        { x: 22,  y: 175, label: "v0", note: "0 — pre" },
        { x: 72,  y: 162, label: "v1", note: "+0.4×" },
        { x: 116, y: 95,  label: "v2", note: "+1.8×" },
        { x: 152, y: 54,  label: "v3", note: "+3.2×" },
      ].map((m, i) => (
        <g key={i}>
          <line
            x1={m.x}
            y1={m.y}
            x2={m.x + 12}
            y2={m.y - 14}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.4"
            strokeDasharray="1 2"
          />
          <circle cx={m.x} cy={m.y} r="3.2" fill="#143A8E" stroke="rgba(255,255,255,0.85)" strokeWidth="0.7" />
          <circle cx={m.x} cy={m.y} r="1.2" fill="#fff" />
          <text
            x={m.x + 14}
            y={m.y - 12}
            fontSize="5.5"
            fill="rgba(255,255,255,0.75)"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            letterSpacing="0.08em"
          >
            {m.note}
          </text>
        </g>
      ))}

      {/* Endpoint burst */}
      <circle cx="178" cy="26" r="22" fill="url(#traj-burst)" opacity="0.5">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="178" cy="26" r="6" fill="#7BB6FF" />
      <circle cx="176.5" cy="24.5" r="2.5" fill="#fff" />

      {/* Burst rays at endpoint */}
      {[-50, -30, -10, 10, 30].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 178 + Math.cos(rad) * 18;
        const y2 = 26 + Math.sin(rad) * 18;
        return (
          <line
            key={angle}
            x1={178 + Math.cos(rad) * 9}
            y1={26 + Math.sin(rad) * 9}
            x2={x2}
            y2={y2}
            stroke="rgba(123,182,255,0.6)"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        );
      })}

      {/* Animated pulse ring at endpoint */}
      <circle cx="178" cy="26" r="6" fill="none" stroke="#7BB6FF" strokeWidth="0.6">
        <animate attributeName="r" values="6;28;6" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Particles emanating after the traveling marker */}
      {[0, 0.6, 1.2].map((delay, i) => (
        <circle key={i} r={2.4 - i * 0.4} fill={i === 0 ? "#fff" : "#CDE2FE"} opacity={i === 0 ? 1 : 0.6}>
          <animateMotion dur="4.8s" repeatCount="indefinite" begin={`${delay}s`} path={MAIN_PATH} />
          <animate attributeName="opacity" values={`${i === 0 ? 1 : 0.6};0`} dur="4.8s" repeatCount="indefinite" begin={`${delay}s`} />
        </circle>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 4: ORBIT — 4 concentric rings with satellites, a nested
   moon-on-satellite orbit, sweeping comet, compound center star
   ═══════════════════════════════════════════════════════════════ */
function OrbitScene() {
  const RINGS = [
    { r: 28, satellites: [40],            duration: "9s",  reverse: false },
    { r: 50, satellites: [110, 280],      duration: "17s", reverse: true  },
    { r: 72, satellites: [60, 200, 320],  duration: "23s", reverse: false },
    { r: 92, satellites: [20, 130, 250],  duration: "31s", reverse: true  },
  ];

  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full p-2 sm:p-4">
      <defs>
        <radialGradient id="orbit-core">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="50%" stopColor="#7BB6FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orbit-comet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7BB6FF" stopOpacity="0" />
          <stop offset="80%" stopColor="#CDE2FE" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Background specks */}
      {Array.from({ length: 30 }).map((_, i) => {
        const seed = i * 173.9;
        const x = ((seed * 3.7) % 200);
        const y = ((seed * 4.9) % 200);
        return (
          <circle key={i} cx={x} cy={y} r="0.45" fill="rgba(255,255,255,0.2)" />
        );
      })}

      {/* Radial guides */}
      <line x1="100" y1="6" x2="100" y2="194" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <line x1="6" y1="100" x2="194" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* Rings */}
      {RINGS.map((ring) => (
        <circle
          key={ring.r}
          cx="100"
          cy="100"
          r={ring.r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
      ))}

      {/* 12 clock-tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + Math.cos(angle) * 96;
        const y1 = 100 + Math.sin(angle) * 96;
        const x2 = 100 + Math.cos(angle) * (i % 3 === 0 ? 102 : 99);
        const y2 = 100 + Math.sin(angle) * (i % 3 === 0 ? 102 : 99);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Center pulse halo + glow */}
      <circle cx="100" cy="100" r="20" fill="url(#orbit-core)" opacity="0.6" />
      <circle cx="100" cy="100" r="14" fill="none" stroke="rgba(123,182,255,0.4)" strokeWidth="0.5">
        <animate attributeName="r" values="14;26;14" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3.2s" repeatCount="indefinite" />
      </circle>

      {/* Central compound rotating star (asterisk) */}
      <g style={{ transformOrigin: "100px 100px", animation: "orbit-spin 9s linear infinite" }}>
        {[0, 45, 90, 135].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + Math.cos(rad) * 8;
          const y1 = 100 + Math.sin(rad) * 8;
          const x2 = 100 - Math.cos(rad) * 8;
          const y2 = 100 - Math.sin(rad) * 8;
          return (
            <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
          );
        })}
        <circle cx="100" cy="100" r="2.5" fill="#7BB6FF" />
      </g>

      {/* Comet — sweeps across diagonally on a long loop */}
      <g style={{ transformOrigin: "100px 100px", animation: "orbit-spin 14s linear infinite" }}>
        <g transform="translate(100 6)">
          <line x1="-14" y1="0" x2="0" y2="0" stroke="url(#orbit-comet)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="0" cy="0" r="2" fill="#fff" />
        </g>
      </g>

      {/* Each ring's satellites orbit at their own speed */}
      {RINGS.map((ring, i) => (
        <g
          key={i}
          style={{
            transformOrigin: "100px 100px",
            animation: `orbit-spin ${ring.duration} linear infinite${ring.reverse ? " reverse" : ""}`,
          }}
        >
          {ring.satellites.map((angle, j) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 100 + Math.cos(rad) * ring.r;
            const cy = 100 + Math.sin(rad) * ring.r;
            const isAccent = i === 1 && j === 0;
            const hasMoon = i === 2 && j === 0;
            return (
              <g key={j}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isAccent ? 3.4 : 1.9}
                  fill={isAccent ? "#7BB6FF" : "rgba(255,255,255,0.9)"}
                />
                {isAccent && (
                  <circle cx={cx} cy={cy} r="6.5" fill="none" stroke="rgba(123,182,255,0.45)" strokeWidth="0.4" />
                )}
                {/* Moon — nested orbit around a satellite */}
                {hasMoon && (
                  <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: "orbit-spin 3.5s linear infinite" }}>
                    <circle cx={cx + 5} cy={cy} r="0.8" fill="rgba(255,255,255,0.9)" />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
