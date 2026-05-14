"use client";

import Link from "next/link";
import {
  MouseEvent as ReactMouseEvent,
  CSSProperties,
  useRef,
  useState,
} from "react";
import {
  Code2,
  Globe,
  Smartphone,
  Sparkles,
  Cloud,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

type Service = {
  id: string;
  icon: typeof Code2;
  title: string;
  desc: string;
  meta: string;
  accent: string;
};

const SERVICES: Service[] = [
  {
    id: "custom-software",
    icon: Code2,
    title: "Custom Software",
    desc: "Bespoke products engineered around your exact business workflow — from MVP to enterprise scale.",
    meta: "Architecture · Backend · Integrations",
    accent: "#7BB6FF",
  },
  {
    id: "web-development",
    icon: Globe,
    title: "Web Development",
    desc: "Modern, performant web experiences built on a battle-tested stack.",
    meta: "Next.js · TypeScript · Edge",
    accent: "#A78BFA",
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native iOS, Android, and cross-platform builds that feel right at home on every device.",
    meta: "iOS · Android · React Native",
    accent: "#34D399",
  },
  {
    id: "ai-data",
    icon: Sparkles,
    title: "AI & Data",
    desc: "From data pipelines to LLM-powered features — practical intelligence, shipped to production.",
    meta: "ML Ops · RAG · Analytics",
    accent: "#FCD34D",
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Resilient infrastructure, automated pipelines, and zero-downtime deployments — at any scale.",
    meta: "AWS · GCP · Kubernetes",
    accent: "#60A5FA",
  },
  {
    id: "product-design",
    icon: Palette,
    title: "Product Design",
    desc: "Human-centered UI/UX backed by research, prototyping, and iteration with your users.",
    meta: "Research · UI · Design Systems",
    accent: "#F472B6",
  },
];

/* Editorial bento — alternating wide/narrow rhythm so 6 items tile across 3 rows with no gaps.
   Row 1: [wide 0] [narrow 1]      → 3 cols
   Row 2: [narrow 2] [wide 3]      → 3 cols
   Row 3: [wide 4] [narrow 5]      → 3 cols */
const WIDE_INDICES = new Set([0, 3, 4]);

export default function Services() {
  const [headerRef, headerVisible] = useReveal<HTMLElement>();
  const [gridRef, gridVisible] = useReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <section className="relative w-full bg-[#143A8E] overflow-hidden py-24 sm:py-28 md:py-32">

      {/* Fine technical grid — closer to engineering blueprint than gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">

        {/* ── Editorial header: left-aligned, monospace label, no line-text-line */}
        <header
          ref={headerRef}
          className={`reveal reveal-up flex flex-col gap-6 sm:gap-7 max-w-3xl ${headerVisible ? "reveal-in" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-[#7BB6FF]"
            >
              03 / SERVICES
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-white/15 to-transparent"
            />
          </div>

          <h2 className="text-white tracking-[-0.02em] leading-[0.98] text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[4.6rem]">
            <span className="font-light text-white/55">Engineered</span>
            <br />
            <span className="font-semibold">to ship.</span>
          </h2>

          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-xl">
            End-to-end software services — strategy through scale. One partner,
            every stage of the build.
          </p>
        </header>

        {/* ── Bento grid */}
        <div
          ref={gridRef}
          className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-[14px] overflow-hidden ring-1 ring-white/[0.07]"
          style={{ perspective: "1200px" }}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              wide={WIDE_INDICES.has(i)}
              visible={gridVisible}
            />
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-8 border-t border-white/[0.06]">
          <p className="text-white/50 text-sm sm:text-[15px] max-w-md">
            Want to dive deeper into any of these capabilities?
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 text-white text-sm sm:text-[15px] font-medium tracking-tight"
          >
            <span className="relative">
              See all services
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-1 h-px bg-white/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.7}
            />
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ── Single bento card — scroll-reveal + mouse spotlight + 3D tilt ── */
function ServiceCard({
  service,
  index,
  wide,
  visible,
}: {
  service: Service;
  index: number;
  wide: boolean;
  visible: boolean;
}) {
  const Icon = service.icon;
  const indexStr = String(index + 1).padStart(2, "0");
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight position
    node.style.setProperty("--mx", `${x}px`);
    node.style.setProperty("--my", `${y}px`);

    // Tilt: max ~4° rotation, smooth across card
    const px = (x / rect.width) * 2 - 1;   // -1 → 1
    const py = (y / rect.height) * 2 - 1;
    setTilt({ rx: -py * 3.2, ry: px * 3.8 });
  };

  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`reveal reveal-up group relative block bg-[#143A8E] p-7 sm:p-8 md:p-9 transition-colors duration-500 hover:bg-[#19449C] overflow-hidden ${
        wide ? "lg:col-span-2" : ""
      } ${visible ? "reveal-in" : ""}`}
      style={{
        "--accent": service.accent,
        transitionDelay: visible ? `${index * 90}ms` : "0ms",
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
        transitionProperty: "opacity, transform, background-color",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDuration: "700ms",
      } as CSSProperties}
    >
      {/* Mouse-tracked spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(380px circle at var(--mx) var(--my), ${service.accent}1f, transparent 70%)`,
        }}
      />

      {/* Top light-line sheen */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
        }}
      />

      {/* Icon watermark */}
      <Icon
        aria-hidden="true"
        className="absolute -top-2 -right-2 w-32 h-32 sm:w-40 sm:h-40 text-white/[0.025] group-hover:text-white/[0.06] transition-all duration-700 pointer-events-none group-hover:rotate-[6deg] group-hover:scale-[1.04]"
        strokeWidth={0.6}
        style={{ transformOrigin: "70% 30%" }}
      />

      <div
        className="relative flex flex-col h-full min-h-[260px] sm:min-h-[300px]"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Index marker */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.28em]">
            <span className="text-white/55 group-hover:text-white transition-colors duration-500">
              {indexStr}
            </span>
            <span className="text-white/25"> / 06</span>
          </span>

          <span
            aria-hidden="true"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:rotate-[-15deg] group-hover:scale-110"
          >
            <ArrowUpRight
              className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors"
              strokeWidth={1.6}
            />
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-10 sm:mt-12 text-white text-[1.6rem] sm:text-[1.85rem] md:text-[2rem] font-medium tracking-[-0.015em] leading-[1.05] transition-transform duration-500 group-hover:translate-x-1">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-white/55 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
          {service.desc}
        </p>

        {/* Spacer */}
        <div className="flex-1 min-h-6" />

        {/* Meta strip */}
        <div className="pt-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-6 group-hover:w-10 transition-all duration-500"
            style={{ backgroundColor: service.accent, opacity: 0.7 }}
          />
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/40 group-hover:text-white/70 transition-colors duration-300 uppercase">
            {service.meta}
          </span>
        </div>
      </div>
    </Link>
  );
}
