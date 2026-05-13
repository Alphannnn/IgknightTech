import AdminShell from "../AdminShell";
import AdminToast from "../AdminToast";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Live counts for the sidebar badges. Cheap aggregates.
  const [pending, drafts, hiddenRoles] = await Promise.all([
    db.meeting.count({ where: { status: "pending" } }),
    db.blogPost.count({ where: { status: "draft" } }),
    db.careerRole.count({ where: { active: false } }),
  ]);

  return (
    <AdminShell badges={{ pending, drafts, hiddenRoles }}>
      {children}
      <AdminToast />
    </AdminShell>
  );
}
