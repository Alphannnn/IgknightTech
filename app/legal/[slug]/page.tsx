"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { LEGAL_DOCS } from "../legal-data";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function LegalDoc() {
  const params = useParams();
  const slug = params.slug as string;
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);
  const others = LEGAL_DOCS.filter((d) => d.slug !== slug);

  if (!doc) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] bg-white flex items-center justify-center text-center px-5">
          <div>
            <div className="text-slate-400 text-sm font-bold uppercase tracking-[0.22em]">
              404 · Not found
            </div>
            <h1 className="mt-3 text-slate-900 text-4xl font-extrabold tracking-tight">
              Page not found
            </h1>
            <p className="mt-3 text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find that legal page. The other documents are
              linked below.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              {LEGAL_DOCS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 text-sm font-semibold px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 transition-all"
                >
                  {d.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200/70">
        <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-10 lg:pl-8 lg:pr-20 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Home
          </Link>
          <span className="font-mono text-slate-400 text-xs tabular-nums">
            Updated {doc.lastUpdated}
          </span>
        </div>
      </div>

      <article className="bg-white">
        {/* Header */}
        <header className="relative w-full overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 border-b border-slate-200/70">
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full opacity-[0.14] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #7BB6FF, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
              <span className="h-px w-6 sm:w-8 bg-slate-300" />
              {doc.eyebrow}
            </div>
            <h1 className="mt-4 text-slate-900 font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-[3.25rem]">
              {doc.title}
            </h1>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-2xl">
              {doc.intro}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.2} />
              Last updated {doc.lastUpdated}
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">

          {/* Sections */}
          <div>
            {doc.sections.map((s, i) => (
              <section
                key={s.heading}
                id={s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="mb-10 last:mb-0 scroll-mt-24"
              >
                <h2 className="text-slate-900 text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                  <span className="font-mono text-slate-400 text-sm mr-3 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                {s.paragraphs.map((p, pi) => (
                  <p
                    key={pi}
                    className="mt-3 text-slate-700 text-base sm:text-[17px] leading-[1.75]"
                  >
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2">
                    {s.list.map((li) => (
                      <li
                        key={li}
                        className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-[15px] leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0"
                        />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* TOC sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start hidden lg:block">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
              On this page
            </div>
            <ol className="space-y-2">
              {doc.sections.map((s, i) => (
                <li key={s.heading}>
                  <a
                    href={`#${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="group block text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <span className="font-mono text-xs text-slate-300 mr-2 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* Other legal docs + CTA */}
        <section className="bg-slate-50/60 border-t border-slate-200/70 py-14 sm:py-16">
          <div className="max-w-[860px] mx-auto px-5 sm:px-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              Other documents
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {others.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-all duration-300 p-5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {d.eyebrow.replace("Legal · ", "")}
                    </div>
                    <div className="mt-1 text-slate-900 text-sm font-bold tracking-tight truncate">
                      {d.title}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                Questions about anything on this page?{" "}
                <a
                  href="mailto:legal@igknight.tech"
                  className="text-slate-900 font-semibold underline-offset-4 hover:underline"
                >
                  legal@igknight.tech
                </a>{" "}
                — we read every message.
              </p>
              <Link
                href="/schedule"
                className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
              >
                Talk to us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
}
