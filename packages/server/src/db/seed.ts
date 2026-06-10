/**
 * @file Dev database seed.
 * @description
 * Sets up convenient dev data: a placeholder "dev" user (so the `position` foreign key has someone
 * to point at before real auth exists), plus a few example purchases so the app has something to
 * render. Idempotent: it only inserts what is missing, so running it twice is safe. Run with
 * `npm run db:seed`. Dev-only convenience, never used in production.
 * @author Chris "Mo" Mochinski
 */

import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { users, positions } from "./schema.js";
import { DEV_USER_ID } from "../lib/currentUser.js";

/**
 * Example purchases for the dev user, with approximate historical prices and real purchase dates so
 * the numbers tell a coherent story (gains and losses against current prices). Two bitcoin buys at
 * different times exercise per-coin aggregation. Numeric values are strings because that is what
 * Postgres `numeric` columns take; `coinsPurchased * pricePerFullCoin` is the derived cost.
 */
const examplePurchases = [
  { coinId: "bitcoin", coinsPurchased: "0.5000", pricePerFullCoin: "42000.00", purchasedAt: new Date("2024-09-10") },
  { coinId: "ethereum", coinsPurchased: "5.0000", pricePerFullCoin: "2400.00", purchasedAt: new Date("2024-06-15") },
  { coinId: "cardano", coinsPurchased: "1000.0000", pricePerFullCoin: "0.38", purchasedAt: new Date("2024-08-01") },
  { coinId: "bitcoin", coinsPurchased: "0.2500", pricePerFullCoin: "68000.00", purchasedAt: new Date("2025-01-20") },
];

/**
 * Ensures the dev user exists, then ensures the example purchases exist. On a fresh database the
 * first inserted user gets id 1, which matches `DEV_USER_ID`. The password is a throwaway
 * placeholder - it is never checked until we build auth.
 */
async function seed(): Promise<void> {
  // 1. the dev user
  const existingUser = await db.select().from(users).where(eq(users.id, DEV_USER_ID));
  if (existingUser.length > 0) {
    console.log(`Dev user (id ${DEV_USER_ID}) already exists.`);
  } else {
    const [created] = await db
      .insert(users)
      .values({ username: "dev", password: "placeholder-not-a-real-hash" })
      .returning();
    console.log("Seeded dev user:", created);
  }

  // 2. the example purchases (only if the dev user has none yet, so re-running does not pile up)
  const existingPositions = await db
    .select()
    .from(positions)
    .where(eq(positions.userId, DEV_USER_ID));

  if (existingPositions.length > 0) {
    console.log(`Dev user already has ${existingPositions.length} positions - skipping examples.`);
  } else {
    const created = await db
      .insert(positions)
      .values(examplePurchases.map((p) => ({ ...p, userId: DEV_USER_ID })))
      .returning();
    console.log(`Seeded ${created.length} example purchases.`);
  }

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
