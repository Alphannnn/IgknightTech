"use server";

import { toggleDayAvailability } from "@/lib/availability";

/** Form action: toggle a day's availability. Field `day` is yyyy-mm-dd. */
export async function toggleDayAction(formData: FormData) {
  const day = String(formData.get("day") ?? "");
  const reason = String(formData.get("reason") ?? "");
  await toggleDayAvailability(day, reason);
}
