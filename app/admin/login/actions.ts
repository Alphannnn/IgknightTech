"use server";

import { redirect } from "next/navigation";
import { checkAdminPassword, setAdminSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!password) {
    return { error: "Password is required." };
  }

  // Tiny delay to take a small bite out of brute-forcing.
  await new Promise((r) => setTimeout(r, 250));

  if (!checkAdminPassword(password)) {
    return { error: "Incorrect password." };
  }

  await setAdminSession();

  // Only allow same-origin redirects.
  const safeNext = next.startsWith("/") ? next : "/admin";
  redirect(safeNext);
}
