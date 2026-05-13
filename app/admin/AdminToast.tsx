"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CheckCircle2, ExternalLink, X } from "lucide-react";
import Link from "next/link";

type Toast = {
  message: string;
  /** Optional CTA shown to the right of the message. */
  cta?: { href: string; label: string };
};

/**
 * Reads the URL for a `?saved=<value>` parameter, shows a slide-in toast,
 * and quietly cleans the URL so a refresh doesn't re-trigger it.
 *
 * Conventions:
 *   ?saved=<slug>   → "Post saved" with a "View" CTA to the public page
 *   ?saved=1        → generic "Saved successfully"
 *   ?deleted=1      → "Deleted"
 */
export default function AdminToast() {
  return (
    <Suspense fallback={null}>
      <ToastImpl />
    </Suspense>
  );
}

function ToastImpl() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [toast, setToast] = useState<Toast | null>(null);
  const [exiting, setExiting] = useState(false);

  // Watch the URL for trigger params
  useEffect(() => {
    const saved = sp.get("saved");
    const deleted = sp.get("deleted");

    let next: Toast | null = null;
    if (saved && saved !== "1") {
      // blog post saved — value is the slug
      next = {
        message: "Post saved.",
        cta: { href: `/resources/blog/${saved}`, label: "View" },
      };
    } else if (saved === "1") {
      next = { message: "Saved successfully." };
    } else if (deleted === "1") {
      next = { message: "Deleted." };
    }

    if (!next) return;

    // setState in an effect is intentional here — we're syncing UI state
    // off a URL query param, which is an external system.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToast(next);
    setExiting(false);

    // Strip the trigger params from the URL so a refresh doesn't re-show.
    const params = new URLSearchParams(sp.toString());
    params.delete("saved");
    params.delete("deleted");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });

    // Start exit animation, then unmount
    const exitTimer = setTimeout(() => setExiting(true), 3400);
    const closeTimer = setTimeout(() => setToast(null), 3800);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [sp, pathname, router]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-3rem)] sm:w-auto pointer-events-auto ${
        exiting ? "admin-toast-exit" : "admin-toast-enter"
      }`}
    >
      <div className="relative flex items-center gap-3 bg-slate-900 text-white rounded-xl shadow-[0_18px_40px_-12px_rgba(15,23,42,0.55)] pl-3 pr-2 py-2.5 overflow-hidden">
        {/* Accent gradient strip on the left */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{
            background:
              "linear-gradient(180deg, #34D399, #10B981 60%, #059669)",
          }}
        />
        <span className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={2.4} />
        </span>
        <span className="text-sm font-semibold min-w-0 truncate">
          {toast.message}
        </span>
        {toast.cta && (
          <Link
            href={toast.cta.href}
            target="_blank"
            className="ml-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-emerald-200 px-2 py-1 rounded-md hover:bg-white/[0.06] transition-colors shrink-0"
          >
            {toast.cta.label}
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
        <button
          onClick={() => setExiting(true)}
          aria-label="Dismiss"
          className="w-7 h-7 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] flex items-center justify-center transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
