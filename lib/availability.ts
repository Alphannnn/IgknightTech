"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { requireAdmin } from "./auth";

function dayToUtc(d: string): Date | null {
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const dt = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return isNaN(dt.getTime()) ? null : dt;
}

/** Admin: list all dates marked as unavailable. */
export async function listAvailabilityOverrides() {
  await requireAdmin();
  return db.availabilityOverride.findMany({
    orderBy: { date: "asc" },
  });
}

/**
 * Public read: list of "yyyy-mm-dd" strings that the admin has marked
 * unavailable. Used by the /schedule date picker to gray out those days.
 */
export async function listBlockedDayStrings(): Promise<string[]> {
  const rows = await db.availabilityOverride.findMany({
    orderBy: { date: "asc" },
    select: { date: true },
  });
  return rows.map((r) => r.date.toISOString().slice(0, 10));
}

/**
 * Admin: toggle a single day. Pass a "yyyy-mm-dd" string. If currently
 * blocked it becomes available; otherwise it becomes blocked.
 */
export async function toggleDayAvailability(
  dayString: string,
  reason?: string
): Promise<{ ok: true; blocked: boolean } | { ok: false; error: string }> {
  await requireAdmin();

  const date = dayToUtc(dayString);
  if (!date) return { ok: false, error: "Invalid date." };

  const existing = await db.availabilityOverride.findUnique({
    where: { date },
  });

  if (existing) {
    await db.availabilityOverride.delete({ where: { date } });
    revalidatePath("/admin/availability");
    revalidatePath("/schedule");
    return { ok: true, blocked: false };
  }

  await db.availabilityOverride.create({
    data: { date, reason: reason?.trim() || null },
  });
  revalidatePath("/admin/availability");
  revalidatePath("/schedule");
  return { ok: true, blocked: true };
}
