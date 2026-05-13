"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <section className="relative w-full min-h-[100svh] py-20 sm:py-24 md:py-28 lg:py-0 lg:h-screen lg:min-h-[640px] bg-[#0C1C3D] overflow-hidden flex items-center">

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
          {/* Small eyebrow accent */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
            <span className="h-px w-6 sm:w-8 bg-blue-300/50" />
            Software Studio
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
                    "linear-gradient(90deg, #7BB6FF 0%, #BFD9FF 60%, #7BB6FF 100%)",
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

          <div className="mt-2 sm:mt-3">
            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2.5 bg-[#4a8fd8] hover:bg-[#3a7fcb] text-white text-sm sm:text-[15px] font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-white/20 transition-all duration-300 shadow-[0_0_32px_rgba(74,144,217,0.5)] hover:shadow-[0_0_48px_rgba(74,144,217,0.75)]"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Right — Premium product composition */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[600px] aspect-[4/3]">

            {/* Ambient glow behind the stack */}
            <div
              aria-hidden="true"
              className="absolute -inset-12 rounded-[3rem] blur-3xl opacity-70 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 55% at 60% 40%, rgba(123,182,255,0.22), transparent 70%)",
              }}
            />

            {/* Main dashboard panel */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.07] via-white/[0.035] to-white/[0.01] backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">

              {/* Top edge highlight */}
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
              />

              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.07]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff6058]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbe2e]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c941]/80" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-white/35 tracking-tight">
                  igknight.tech / workspace
                </span>
                <span className="w-10" />
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-4 sm:gap-5">

                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200/55">
                      Production
                    </div>
                    <div className="mt-1 text-white text-sm sm:text-base font-semibold tracking-tight">
                      Live deployments
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300 bg-emerald-400/[0.09] border border-emerald-400/25 px-2.5 py-1 rounded-full">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                      <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Operational
                  </span>
                </div>

                {/* KPI tiles */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {[
                    { label: "Uptime", value: "99.99", unit: "%" },
                    { label: "Deploys", value: "142", unit: "/wk" },
                    { label: "p95",     value: "128", unit: "ms" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="relative rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5 sm:p-3 overflow-hidden"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute top-0 left-3 right-3 h-px bg-white/10"
                      />
                      <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200/45">
                        {kpi.label}
                      </div>
                      <div className="mt-1 text-white text-base sm:text-lg font-bold tracking-tight">
                        {kpi.value}
                        <span className="text-[11px] sm:text-xs text-blue-200/50 font-medium ml-0.5">
                          {kpi.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sparkline */}
                <div className="relative h-16 sm:h-20 rounded-lg border border-white/[0.06] bg-gradient-to-b from-white/[0.025] to-transparent overflow-hidden">
                  <svg
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="hero-spark-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7BB6FF" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#7BB6FF" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="hero-spark-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#7BB6FF" />
                        <stop offset="100%" stopColor="#BFD9FF" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,78 C40,72 65,60 100,56 C140,50 165,72 200,62 C240,50 270,30 320,26 C360,22 380,18 400,14 L400,100 L0,100 Z"
                      fill="url(#hero-spark-fill)"
                    />
                    <path
                      d="M0,78 C40,72 65,60 100,56 C140,50 165,72 200,62 C240,50 270,30 320,26 C360,22 380,18 400,14"
                      fill="none"
                      stroke="url(#hero-spark-line)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    {/* Endpoint dot */}
                    <circle cx="400" cy="14" r="3" fill="#BFD9FF" />
                  </svg>
                </div>

                {/* Service rows */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {[
                    { name: "stratify-api",  status: "shipped",   dot: "#7BB6FF" },
                    { name: "vyra-mobile",   status: "deploying", dot: "#FCD34D" },
                  ].map((row) => (
                    <div
                      key={row.name}
                      className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.018] px-3 py-1.5 sm:py-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            background: row.dot,
                            boxShadow: `0 0 8px ${row.dot}90`,
                          }}
                        />
                        <span className="text-[11px] sm:text-[12px] font-mono text-white/80 truncate">
                          {row.name}
                        </span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200/55">
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating deploy card */}
            <div className="absolute -top-5 -right-3 sm:-top-7 sm:-right-6 w-40 sm:w-48 rounded-xl border border-white/[0.14] bg-gradient-to-br from-[#1a2c5c]/95 to-[#0f1f45]/95 backdrop-blur-xl shadow-[0_18px_50px_-10px_rgba(0,0,0,0.7)] p-3 sm:p-3.5">
              <div className="absolute top-0 inset-x-3 h-px bg-white/15" />
              <div className="flex items-center justify-between">
                <div className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-blue-200/55">
                  Deploy
                </div>
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
              </div>
              <div className="mt-1.5 sm:mt-2 text-white text-xs sm:text-sm font-semibold tracking-tight">
                main → prod
              </div>
              <div className="mt-0.5 text-[10px] sm:text-[11px] text-emerald-300/85 font-mono">
                +18 commits · 42s
              </div>
            </div>

            {/* Floating file chip */}
            <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-[#0f1f45]/90 backdrop-blur-xl px-3 sm:px-3.5 py-1.5 sm:py-2 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.6)]">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#A78BFA", boxShadow: "0 0 8px #A78BFA90" }}
              />
              <span className="text-[10px] sm:text-[11px] font-mono text-white/85">
                ai-pipeline.ts
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
