"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

interface WaveDef {
  p0x: number; p0y: number;
  c1x: number; c1y: number;
  c2x: number; c2y: number;
  p1x: number; p1y: number;
  speed: number;
  amp:   number;
  phase: number;
  alpha: number;
}

// Tight wave bands — closer spacing, varied curvature, organic feel
const WAVES: WaveDef[] = [
  { p0x:-160, p0y:80,  c1x:340, c1y:130, c2x:980,  c2y:50,  p1x:1600, p1y:120, speed:0.18, amp:10, phase:0.0, alpha:0.09 },
  { p0x:-160, p0y:112, c1x:360, c1y:158, c2x:1020, c2y:82,  p1x:1600, p1y:150, speed:0.14, amp:8,  phase:0.6, alpha:0.07 },
  { p0x:-160, p0y:144, c1x:320, c1y:198, c2x:960,  c2y:118, p1x:1600, p1y:178, speed:0.21, amp:12, phase:1.2, alpha:0.08 },
  { p0x:-160, p0y:176, c1x:380, c1y:222, c2x:1040, c2y:146, p1x:1600, p1y:210, speed:0.12, amp:9,  phase:1.9, alpha:0.06 },
  { p0x:-160, p0y:210, c1x:340, c1y:262, c2x:980,  c2y:180, p1x:1600, p1y:248, speed:0.17, amp:11, phase:2.5, alpha:0.07 },
  { p0x:-160, p0y:244, c1x:360, c1y:292, c2x:1000, c2y:216, p1x:1600, p1y:278, speed:0.20, amp:7,  phase:3.0, alpha:0.06 },
  { p0x:-160, p0y:278, c1x:320, c1y:330, c2x:1020, c2y:248, p1x:1600, p1y:312, speed:0.13, amp:10, phase:3.7, alpha:0.07 },
  { p0x:-160, p0y:312, c1x:380, c1y:362, c2x:960,  c2y:284, p1x:1600, p1y:348, speed:0.19, amp:8,  phase:4.3, alpha:0.06 },
  { p0x:-160, p0y:348, c1x:340, c1y:396, c2x:1000, c2y:318, p1x:1600, p1y:380, speed:0.15, amp:13, phase:4.9, alpha:0.05 },
  { p0x:-160, p0y:384, c1x:360, c1y:434, c2x:1040, c2y:352, p1x:1600, p1y:418, speed:0.22, amp:9,  phase:5.5, alpha:0.06 },
  { p0x:-160, p0y:420, c1x:320, c1y:468, c2x:980,  c2y:388, p1x:1600, p1y:452, speed:0.16, amp:11, phase:0.4, alpha:0.05 },
  { p0x:-160, p0y:456, c1x:380, c1y:506, c2x:1020, c2y:422, p1x:1600, p1y:488, speed:0.14, amp:8,  phase:1.0, alpha:0.05 },
  { p0x:-160, p0y:492, c1x:340, c1y:540, c2x:960,  c2y:460, p1x:1600, p1y:522, speed:0.20, amp:12, phase:1.7, alpha:0.06 },
  { p0x:-160, p0y:528, c1x:360, c1y:578, c2x:1000, c2y:494, p1x:1600, p1y:558, speed:0.13, amp:9,  phase:2.4, alpha:0.05 },
  { p0x:-160, p0y:564, c1x:320, c1y:612, c2x:1040, c2y:532, p1x:1600, p1y:594, speed:0.18, amp:10, phase:3.1, alpha:0.05 },
  { p0x:-160, p0y:600, c1x:380, c1y:648, c2x:980,  c2y:566, p1x:1600, p1y:628, speed:0.15, amp:13, phase:3.8, alpha:0.04 },
  { p0x:-160, p0y:636, c1x:340, c1y:684, c2x:1000, c2y:600, p1x:1600, p1y:664, speed:0.21, amp:8,  phase:4.5, alpha:0.05 },
  { p0x:-160, p0y:672, c1x:360, c1y:720, c2x:1020, c2y:638, p1x:1600, p1y:700, speed:0.12, amp:11, phase:5.2, alpha:0.04 },
  { p0x:-160, p0y:710, c1x:320, c1y:756, c2x:960,  c2y:672, p1x:1600, p1y:738, speed:0.19, amp:9,  phase:5.9, alpha:0.04 },
  { p0x:-160, p0y:748, c1x:380, c1y:794, c2x:1040, c2y:710, p1x:1600, p1y:774, speed:0.16, amp:12, phase:0.8, alpha:0.04 },
];

const DS_W = 1440;
const DS_H = 900;

const HEADING_PREFIX = "Delivering Modern Solutions";

const HEADING_SUFFIXES = [
  "For Businesses",
  "For Startups",
  "For Enterprises",
  "With Innovation",
  "With Excellence",
  "For Growth",
  "For Visionaries",
  "For The Future",
];

const TYPE_SPEED   = 55;   // ms per character while typing
const DELETE_SPEED = 28;   // ms per character while deleting
const HOLD_FULL    = 1600; // pause after fully typed
const HOLD_EMPTY   = 350;  // pause before next heading

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rawMouse  = useRef({ x: 0.5, y: 0.5 });
  const lerpMouse = useRef({ x: 0.5, y: 0.5 });
  const rafRef    = useRef<number>(0);

  const [headingIndex, setHeadingIndex] = useState(0);
  const [typed, setTyped]               = useState("");
  const [phase, setPhase]               = useState<"typing" | "holding" | "deleting" | "pausing">("typing");

  // Typing engine
  useEffect(() => {
    const current = HEADING_SUFFIXES[headingIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < current.length) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), TYPE_SPEED);
      } else {
        timer = setTimeout(() => setPhase("deleting"), HOLD_FULL);
      }
    } else if (phase === "deleting") {
      if (typed.length > 0) {
        timer = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), DELETE_SPEED);
      } else {
        timer = setTimeout(() => {
          setHeadingIndex((i) => (i + 1) % HEADING_SUFFIXES.length);
          setPhase("typing");
        }, HOLD_EMPTY);
      }
    }

    return () => clearTimeout(timer);
  }, [typed, phase, headingIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      rawMouse.current.x = e.clientX / window.innerWidth;
      rawMouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;
    const LERP = 0.055;

    const draw = () => {
      t += 0.008;

      lerpMouse.current.x += (rawMouse.current.x - lerpMouse.current.x) * LERP;
      lerpMouse.current.y += (rawMouse.current.y - lerpMouse.current.y) * LERP;

      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      ctx.clearRect(0, 0, cssW, cssH);

      const scaleX = cssW / DS_W;
      const scaleY = cssH / DS_H;

      const mx = lerpMouse.current.x * cssW;
      const my = lerpMouse.current.y * cssH;

      for (const w of WAVES) {
        const osc  = Math.sin(t * w.speed * 6.28  + w.phase)       * w.amp;
        const osc2 = Math.sin(t * w.speed * 12.56 + w.phase + 1.3) * (w.amp * 0.3);
        const totalOsc = osc + osc2;

        const p0x = w.p0x * scaleX;
        const p0y = (w.p0y + totalOsc)        * scaleY;
        const c1x = w.c1x * scaleX;
        const c1y = (w.c1y + totalOsc * 0.85) * scaleY;
        const c2x = w.c2x * scaleX;
        const c2y = (w.c2y + totalOsc * 0.55) * scaleY;
        const p1x = w.p1x * scaleX;
        const p1y = (w.p1y + totalOsc * 0.25) * scaleY;

        // Mouse repulsion — sample 6 points along bezier
        const RADIUS   = 320;
        const MAX_PUSH = 60;

        let closestDist = Infinity;
        for (let s = 0; s <= 1; s += 0.16667) {
          const u = 1 - s;
          const bx = u*u*u*p0x + 3*u*u*s*c1x + 3*u*s*s*c2x + s*s*s*p1x;
          const by = u*u*u*p0y + 3*u*u*s*c1y + 3*u*s*s*c2y + s*s*s*p1y;
          const d  = Math.hypot(bx - mx, by - my);
          if (d < closestDist) closestDist = d;
        }

        const pushStrength = Math.max(0, 1 - closestDist / RADIUS);
        const push = pushStrength * pushStrength * MAX_PUSH;

        // Push direction: away from cursor
        const midX = (c1x + c2x) / 2;
        const midY = (c1y + c2y) / 2;
        const dx   = midX - mx;
        const dy   = midY - my;
        const len  = Math.hypot(dx, dy) + 0.001;
        const deflectX = (dx / len) * push;
        const deflectY = (dy / len) * push;

        ctx.beginPath();
        ctx.moveTo(p0x, p0y);
        ctx.bezierCurveTo(
          c1x + deflectX, c1y + deflectY,
          c2x + deflectX, c2y + deflectY,
          p1x, p1y,
        );
        ctx.strokeStyle = `rgba(255,255,255,${w.alpha + pushStrength * 0.09})`;
        ctx.lineWidth   = 1 + pushStrength * 0.7;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] py-20 sm:py-24 md:py-28 lg:py-0 lg:h-screen lg:min-h-[640px] bg-[#143A8E] overflow-hidden flex items-center">

      {/* Animated canvas — full bleed */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)",
        }}
      />

      {/* Premium radial accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 55% 50% at 92% 5%,  rgba(96,144,255,0.18) 0%, transparent 70%)",
            "radial-gradient(ellipse 35% 40% at 8% 100%, rgba(0,0,0,0.45)      0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Floating dots */}
      {([
        { l:"42%", t:"36%", s:"10px", d:"0s"   },
        { l:"67%", t:"18%", s:"7px",  d:"0.7s" },
        { l:"51%", b:"14%", s:"5px",  d:"0.3s" },
        { l:"88%", t:"62%", s:"5px",  d:"2.1s" },
      ] as {l:string;t?:string;b?:string;s:string;d:string}[]).map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/20 animate-pulse"
          style={{
            left:           dot.l,
            top:            dot.t,
            bottom:         dot.b,
            width:          dot.s,
            height:         dot.s,
            animationDelay: dot.d,
            animationDuration: "3s",
          }}
        />
      ))}

      {/* Content — shifted left */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 lg:gap-10 items-center">

        {/* Left — Text */}
        <div className="flex flex-col gap-4 sm:gap-5 text-center lg:text-left items-center lg:items-start lg:-ml-6">
          {/* Editorial meta line — replaces line+text eyebrow */}
          <div className="flex items-center gap-3 font-mono">
            <span className="text-[10px] sm:text-[11px] tracking-[0.32em] text-[#7BB6FF]">
              00 / SOFTWARE STUDIO
            </span>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gradient-to-r from-[#7BB6FF]/40 to-transparent"
            />
            <span className="text-[10px] tracking-[0.18em] text-white/35 uppercase hidden sm:inline">
              Est. 2024
            </span>
          </div>

          <h1 className="font-semibold tracking-tight leading-[1.02]">
            <span
              className="block text-white text-[2.25rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold"
              style={{
                letterSpacing: "-0.035em",
                fontFeatureSettings: '"ss01", "cv11"',
              }}
            >
              {HEADING_PREFIX}
            </span>
            <span className="block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-[1.85rem] lg:text-[2.15rem] font-semibold tracking-tight min-h-[2.4em] sm:min-h-[2.2em]">
              <span
                aria-live="polite"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #7BB6FF 0%, #CDE2FE 60%, #7BB6FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.01em",
                }}
              >
                {typed}
              </span>
              <span
                className="inline-block w-[2px] md:w-[3px] h-[0.9em] align-[-0.12em] ml-1 bg-[#7BB6FF] animate-pulse"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="text-slate-300/80 text-[15px] sm:text-base md:text-[17px] leading-relaxed max-w-[460px]">
            Project management software that enables your teams to collaborate,
            plan, analyze and manage everyday tasks.
          </p>

          {/* Premium CTA cluster — magnetic on cursor proximity */}
          <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4">
            <Magnetic strength={0.35}>
              <Link
                href="/schedule"
                className="group relative inline-flex items-center gap-2.5 bg-white text-slate-900 text-sm sm:text-[15px] font-medium px-6 sm:px-7 py-3 sm:py-3.5 rounded-[8px] transition-all duration-300 overflow-hidden tracking-tight"
                style={{
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.5) inset, 0 0 0 1px rgba(255,255,255,0.06), 0 14px 30px -12px rgba(123,182,255,0.45)",
                }}
              >
                {/* Hover sheen */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(123,182,255,0.18) 50%, transparent 70%)",
                  }}
                />
                <span className="relative">Start a project</span>
                <ArrowRight
                  className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  strokeWidth={2}
                />
              </Link>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2.5 text-white/85 hover:text-white text-sm sm:text-[15px] font-medium px-2 sm:px-3 py-3 sm:py-3.5 tracking-tight transition-colors"
              >
                <span className="relative">
                  See our work
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-white/60 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"
                  />
                </span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  strokeWidth={1.7}
                />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Right — Editorial scene canvas (NEXUS / PRISM / TRAJECTORY / ORBIT) */}
        <div className="relative flex justify-center lg:justify-end">
          <HeroVisual activeHeadingIndex={headingIndex} />
        </div>

      </div>
    </section>
  );
}

/* ── Magnetic wrapper — the child shifts toward the cursor on proximity ── */
function Magnetic({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const node = wrapRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setOffset({ x: dx, y: dy });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <span
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </span>
  );
}
