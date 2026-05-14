/**
 * User-side auth helpers — public visitors who have signed in with Google.
 * Mirrors lib/auth.ts but for the user session cookie.
 */
import { cookies } from "next/headers";
import { db } from "./db";
import {
  USER_SESSION_COOKIE_NAME,
  verifyUserSessionToken,
} from "./session";

export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
};

/** Read the current user from the signed cookie, or null if not signed in. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const c = await cookies();
  const token = c.get(USER_SESSION_COOKIE_NAME)?.value;
  const payload = await verifyUserSessionToken(token);
  if (!payload) return null;

  const user = await db.user.findUnique({
    where: { id: payload.uid },
    select: { id: true, email: true, name: true, image: true },
  });
  return user;
}
