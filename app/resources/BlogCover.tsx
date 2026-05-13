"use client";

import { ArrowUpRight, Clock } from "lucide-react";

/**
 * Minimal cover-only shape that both the legacy `Article` (resources-data.ts)
 * and the DB-backed `BlogPostView` (lib/blog.ts) satisfy. Keeps this leaf
 * component decoupled from either data source.
 */
type Article = {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  image?: string | null;
};

/**
 * BlogCover — a generative, image-free cover treatment for every article.
 *
 * Uses the article's categoryColor as the gradient/halo/grid color, and
 * renders the article's first letter as a large editorial mark. Designed to
 * feel like a magazine cover and to never depend on a real image file.
 */
export function BlogCover({
  article,
  aspect,
  size,
  rounded = "rounded-2xl",
  showHoverArrow = true,
}: {
  article: Article;
  aspect: string;
  size: "large" | "small" | "hero";
  rounded?: string;
  showHoverArrow?: boolean;
}) {
  const c = article.categoryColor;
  const initial = article.title
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 1)
    .toUpperCase();

  const titleSize =
    size === "hero"
      ? "text-[14rem] sm:text-[20rem] lg:text-[26rem]"
      : size === "large"
        ? "text-[9rem] sm:text-[12rem] lg:text-[14rem]"
        : "text-[7rem] sm:text-[9rem]";

  return (
    <div
      className={`relative w-full ${aspect} overflow-hidden ${rounded} border border-slate-200/80 group-hover:shadow-[0_20px_50px_-22px_rgba(15,23,42,0.22)] transition-shadow duration-700`}
      style={{
        background: `linear-gradient(135deg, ${c}1A 0%, ${c}08 60%, #ffffff 100%)`,
      }}
    >
      {/* Color halo top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }}
      />
      {/* Secondary halo bottom-left for hero size */}
      {size === "hero" && (
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${c}, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: `linear-gradient(${c}1A 1px, transparent 1px), linear-gradient(90deg, ${c}1A 1px, transparent 1px)`,
          backgroundSize: size === "hero" ? "56px 56px" : "40px 40px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      {/* Big editorial letter (decorative) — only when no real image */}
      {!article.image && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`${titleSize} font-black tracking-tighter leading-none select-none transition-transform duration-700 group-hover:scale-[1.04]`}
            style={{ color: `${c}26`, letterSpacing: "-0.08em" }}
          >
            {initial}
          </span>
        </div>
      )}

      {/* Real featured image overlay — CSS background-image silently degrades
          to the generative chrome beneath if the file isn't there yet. */}
      {article.image && (
        <div
          aria-label={`${article.title} cover image`}
          role="img"
          className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${article.image})` }}
        />
      )}

      {/* Bottom legibility scrim — only when a real image is present so chips
          stay readable over any photo. */}
      {article.image && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0) 75%)",
          }}
        />
      )}

      {/* Category mark — bottom left */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        {article.image ? (
          // On a real photo, chip the label for legibility on any background
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] bg-white/90 backdrop-blur-sm border border-white/40 px-2 py-0.5 rounded-full">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: c }}
            />
            <span style={{ color: c }}>{article.category}</span>
          </span>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: c }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: c }}
            >
              {article.category}
            </span>
          </>
        )}
      </div>

      {/* Read-time chip — bottom right */}
      <div className="absolute bottom-4 right-4">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.14em] text-slate-700 bg-white/85 backdrop-blur-sm border border-slate-200/80 px-2 py-0.5 rounded-full">
          <Clock className="w-3 h-3" /> {article.readTime}
        </span>
      </div>

      {/* Top-left issue number for the featured and hero sizes */}
      {(size === "large" || size === "hero") && (
        <div className="absolute top-4 left-4 font-mono text-[11px] tabular-nums text-slate-500 bg-white/85 backdrop-blur-sm border border-slate-200/80 px-2 py-0.5 rounded-full">
          Issue · {article.date.split(",")[1]?.trim() ?? article.date}
        </div>
      )}

      {/* Hover indicator — arrow chip top-right */}
      {showHoverArrow && (
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm border border-slate-200/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight
            className="w-4 h-4"
            style={{ color: c }}
            strokeWidth={2.2}
          />
        </div>
      )}
    </div>
  );
}
