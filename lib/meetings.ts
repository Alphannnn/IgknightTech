"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { requireAdmin } from "./auth";

export type BookMeetingInput = {
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
  meetingType: string;
  /** ISO yyyy-mm-dd of the requested date */
  date: string;
  /** Human-readable time slot, e.g. "10:00 AM" */
  timeSlot: string;
};

export type BookMeetingResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/** Normalize a "yyyy-mm-dd" string to UTC midnight Date. */
function dayToUtc(d: string): Date | null {
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const dt = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return isNaN(dt.getTime()) ? null : dt;
}

const VALID_TYPES = new Set([
  "discovery",
  "consultation",
  "technical",
  "general",
]);

/** Public: called from /schedule form. No auth required. */
export async function bookMeeting(
  input: BookMeetingInput
): Promise<BookMeetingResult> {
  // Validate
  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim().toLowerCase();
  const company = input.company ? String(input.company).trim() : null;
  const message = input.message ? String(input.message).trim() : null;
  const meetingType = String(input.meetingType ?? "").trim();
  const timeSlot = String(input.timeSlot ?? "").trim();
  const date = dayToUtc(String(input.date ?? ""));

  if (!name || name.length > 200) {
    return { ok: false, error: "A valid name is required." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!VALID_TYPES.has(meetingType)) {
    return { ok: false, error: "Pick a meeting type." };
  }
  if (!date) {
    return { ok: false, error: "Pick a date." };
  }
  if (!timeSlot || timeSlot.length > 32) {
    return { ok: false, error: "Pick a time slot." };
  }

  // Reject dates in the past
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (date.getTime() < today.getTime()) {
    return { ok: false, error: "Date must be today or later." };
  }

  // Reject if admin has marked the day unavailable
  const override = await db.availabilityOverride.findUnique({
    where: { date },
  });
  if (override) {
    return {
      ok: false,
      error: "That day is no longer available. Please pick another date.",
    };
  }

  const created = await db.meeting.create({
    data: {
      name,
      email,
      company,
      message,
      meetingType,
      date,
      timeSlot,
    },
    select: { id: true },
  });

  // Refresh admin views so a new meeting appears immediately
  revalidatePath("/admin");
  revalidatePath("/admin/meetings");

  return { ok: true, id: created.id };
}

/** Admin: list meetings, optionally filtered by status. */
export async function listMeetings(opts?: { status?: string }) {
  await requireAdmin();
  const where = opts?.status ? { status: opts.status } : {};
  return db.meeting.findMany({
    where,
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
  });
}

/** Admin: set a meeting's status. */
export async function setMeetingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled" | "completed"
) {
  await requireAdmin();
  await db.meeting.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin");
  revalidatePath("/admin/meetings");
}

/** Admin: hard-delete a meeting. */
export async function deleteMeeting(id: string) {
  await requireAdmin();
  await db.meeting.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/admin/meetings");
}
