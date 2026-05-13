import { listActiveRoles } from "@/lib/careers";
import CareersClient from "./CareersClient";

export const dynamic = "force-dynamic";

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
