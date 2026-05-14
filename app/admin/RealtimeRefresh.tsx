"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const POLL_MS = 8000;

export default function RealtimeRefresh() {
  const router = useRouter();
  const lastTsRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function checkOnce() {
      if (cancelled || inFlightRef.current) return;
      inFlightRef.current = true;
      try {
        const res = await fetch("/api/admin/last-event", { cache: "no-store" });
        if (!res.ok) return;
        const { ts } = (await res.json()) as { ts: number };
        if (cancelled) return;
        if (lastTsRef.current === null) {
          lastTsRef.current = ts;
        } else if (ts > lastTsRef.current) {
          lastTsRef.current = ts;
          router.refresh();
        }
      } catch {
        // Network blip — try again next tick.
      } finally {
        inFlightRef.current = false;
      }
    }

    function schedule() {
      if (cancelled) return;
      if (document.hidden) return;
      timer = setTimeout(async () => {
        await checkOnce();
        schedule();
      }, POLL_MS);
    }

    function onVisibility() {
      if (timer) clearTimeout(timer);
      if (!document.hidden) {
        checkOnce().then(schedule);
      }
    }

    checkOnce().then(schedule);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [router]);

  return null;
}
