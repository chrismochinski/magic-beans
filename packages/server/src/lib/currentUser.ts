/**
 * @file Current-user helper (TEMPORARY).
 * @description
 * Until we build real session auth, the whole app pretends every request comes from one dev user.
 * Isolating that assumption here means the swap to real auth later touches exactly one function
 * instead of every route. There must be a row in the "user" table with `DEV_USER_ID` - run the
 * seed script (`npm run db:seed`) to create it.
 * @author Chris "Mo" Mochinski
 */

import type { Request } from "express";

/** The stand-in logged-in user id used everywhere until auth exists. Matches the seeded dev user. */
export const DEV_USER_ID = 1;

/**
 * Returns the id of the "logged-in" user for a request. For now this is always the dev user.
 *
 * @param _req - The Express request (unused until real auth reads the session).
 * @returns The current user's id.
 */
export function getCurrentUserId(_req: Request): number {
  // TODO(auth): replace with the user id stored on the session once auth is built.
  return DEV_USER_ID;
}
