import { listBlockedDayStrings } from "@/lib/availability";
import ScheduleClient from "./ScheduleClient";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  // Load admin-blocked days so the date picker can gray them out
  // and any booking attempt for them will be rejected server-side too.
  const blockedDays = await listBlockedDayStrings();
  return <ScheduleClient blockedDays={blockedDays} />;
}
