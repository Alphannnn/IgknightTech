import { listBlockedDayStrings } from "@/lib/availability";
import { getCurrentUser } from "@/lib/user-auth";
import ScheduleClient from "./ScheduleClient";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const [blockedDays, user] = await Promise.all([
    listBlockedDayStrings(),
    getCurrentUser(),
  ]);
  return (
    <ScheduleClient
      blockedDays={blockedDays}
      user={
        user
          ? { name: user.name, email: user.email, image: user.image }
          : null
      }
    />
  );
}
