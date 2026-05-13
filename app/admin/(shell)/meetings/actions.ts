"use server";

import { setMeetingStatus, deleteMeeting } from "@/lib/meetings";

const VALID_STATUSES = new Set([
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

/** Form action: change a meeting's status (button name=status value=...). */
export async function updateStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !VALID_STATUSES.has(status)) return;
  await setMeetingStatus(
    id,
    status as "pending" | "confirmed" | "cancelled" | "completed"
  );
}

/** Form action: hard-delete a meeting. */
export async function deleteAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteMeeting(id);
}
