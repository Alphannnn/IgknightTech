import { requireAdmin } from "@/lib/auth";
import RoleForm, { type RoleFormInitial } from "../RoleForm";

export default async function NewRolePage() {
  await requireAdmin();

  const today = new Date().toISOString().slice(0, 10);
  const initial: RoleFormInitial = {
    title: "",
    dept: "Engineering",
    location: "Remote · Worldwide",
    type: "Full-time",
    posted: today,
    featured: false,
    active: true,
  };

  return <RoleForm initial={initial} />;
}
