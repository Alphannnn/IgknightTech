/**
 * Careers data layer — server-only helpers and types.
 */
import { db } from "./db";

export type CareerRoleView = {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  posted: Date;
  postedRelative: string; // "2d ago"
  featured: boolean;
  active: boolean;
};

// Re-exported here so server code only needs one import; the constants
// themselves live in a DB-free module so client forms can import them too.
export { VALID_DEPTS, VALID_TYPES } from "./careers-constants";

function relative(d: Date): string {
  const diffMs = Date.now() - d.getTime();
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diffMs / day);
  if (days < 1) return "Today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

type Row = Awaited<ReturnType<typeof db.careerRole.findFirst>> extends infer T
  ? T extends null
    ? never
    : T
  : never;

function toView(row: Row): CareerRoleView {
  return {
    id: row.id,
    title: row.title,
    dept: row.dept,
    location: row.location,
    type: row.type,
    posted: row.posted,
    postedRelative: relative(row.posted),
    featured: row.featured,
    active: row.active,
  };
}

/** Public: list active roles for /careers. */
export async function listActiveRoles(): Promise<CareerRoleView[]> {
  const rows = await db.careerRole.findMany({
    where: { active: true },
    orderBy: [{ featured: "desc" }, { posted: "desc" }],
  });
  return rows.map(toView);
}

/** Admin: list every role including inactive. */
export async function listAllRoles(): Promise<CareerRoleView[]> {
  const rows = await db.careerRole.findMany({
    orderBy: [{ active: "desc" }, { featured: "desc" }, { posted: "desc" }],
  });
  return rows.map(toView);
}

/** Get a single role by id. */
export async function getRole(id: string): Promise<CareerRoleView | null> {
  const row = await db.careerRole.findUnique({ where: { id } });
  return row ? toView(row) : null;
}
