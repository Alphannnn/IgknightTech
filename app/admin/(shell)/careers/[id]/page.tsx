import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getRole } from "@/lib/careers";
import RoleForm, { type RoleFormInitial } from "../RoleForm";

type Params = Promise<{ id: string }>;

export default async function EditRolePage({ params }: { params: Params }) {
  await requireAdmin();
  const { id } = await params;
  const role = await getRole(id);
  if (!role) notFound();

  const initial: RoleFormInitial = {
    id: role.id,
    title: role.title,
    dept: role.dept,
    location: role.location,
    type: role.type,
    posted: role.posted.toISOString().slice(0, 10),
    featured: role.featured,
    active: role.active,
  };

  return <RoleForm initial={initial} />;
}
