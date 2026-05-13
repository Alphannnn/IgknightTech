"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { VALID_DEPTS, VALID_TYPES } from "@/lib/careers";

export type SaveRoleState = {
  error?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

function fieldString(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function saveRoleAction(
  _prev: SaveRoleState,
  formData: FormData
): Promise<SaveRoleState> {
  await requireAdmin();

  const id        = fieldString(formData, "id");
  const title     = fieldString(formData, "title");
  const dept      = fieldString(formData, "dept");
  const location  = fieldString(formData, "location");
  const type      = fieldString(formData, "type");
  const postedRaw = fieldString(formData, "posted");
  const featured  = formData.get("featured") === "on";
  const active    = formData.get("active") !== null
    ? formData.get("active") === "on"
    : true; // default true on create

  const fieldErrors: Record<string, string> = {};
  if (!title) fieldErrors.title = "Title is required.";
  if (!VALID_DEPTS.includes(dept as (typeof VALID_DEPTS)[number])) {
    fieldErrors.dept = "Pick a department.";
  }
  if (!location) fieldErrors.location = "Location is required.";
  if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    fieldErrors.type = "Pick an employment type.";
  }

  let posted: Date | null = null;
  if (postedRaw) {
    posted = new Date(postedRaw);
    if (isNaN(posted.getTime())) {
      fieldErrors.posted = "Invalid date.";
      posted = null;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const data = {
    title,
    dept,
    location,
    type,
    featured,
    active,
    ...(posted ? { posted } : {}),
  };

  if (id) {
    await db.careerRole.update({ where: { id }, data });
  } else {
    await db.careerRole.create({ data });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/careers");
  revalidatePath("/careers");

  redirect("/admin/careers?saved=1");
}

export async function deleteRoleAction(formData: FormData) {
  await requireAdmin();
  const id = fieldString(formData, "id");
  if (!id) return;
  await db.careerRole.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
}

export async function toggleRoleActiveAction(formData: FormData) {
  await requireAdmin();
  const id = fieldString(formData, "id");
  if (!id) return;
  const role = await db.careerRole.findUnique({ where: { id }, select: { active: true } });
  if (!role) return;
  await db.careerRole.update({ where: { id }, data: { active: !role.active } });
  revalidatePath("/admin");
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
}
