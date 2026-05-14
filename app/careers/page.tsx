import { listActiveRoles } from "@/lib/careers";
import CareersClient from "./CareersClient";

// ISR: served from edge cache, regenerated every 60s. Admin edits to roles
// call revalidatePath("/careers") in lib/careers.ts so changes appear sooner.
export const revalidate = 60;

export default async function CareersPage() {
  const rolesView = await listActiveRoles();
  // Project the DB view into the shape the client component expects
  // (its `Role` type uses `posted: string` — a relative label).
  const roles = rolesView.map((r) => ({
    id: r.id,
    title: r.title,
    dept: r.dept,
    location: r.location,
    type: r.type,
    posted: r.postedRelative,
    featured: r.featured,
  }));
  return <CareersClient roles={roles} />;
}
