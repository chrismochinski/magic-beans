/**
 * @file Dev database seed.
 * @description
 * Inserts a single placeholder "dev" user so the `position` table's foreign key has something to
 * point at while we build features before real auth exists. Idempotent: running it twice is safe.
 * Run with `npm run db:seed`. This is dev-only convenience, never used in production.
 * @author Chris "Mo" Mochinski
 */

import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { users } from "./schema.js";
import { DEV_USER_ID } from "../lib/currentUser.js";

/**
 * Ensures the dev user exists. On a fresh database the first inserted user gets id 1, which matches
 * `DEV_USER_ID`. The password is a throwaway placeholder - it is never checked until we build auth.
 */
async function seed(): Promise<void> {
  const existing = await db.select().from(users).where(eq(users.id, DEV_USER_ID));

  if (existing.length > 0) {
    console.log(`Dev user (id ${DEV_USER_ID}) already exists - nothing to do.`);
  } else {
    const [created] = await db
      .insert(users)
      .values({ username: "dev", password: "placeholder-not-a-real-hash" })
      .returning();
    console.log(`Seeded dev user:`, created);
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
