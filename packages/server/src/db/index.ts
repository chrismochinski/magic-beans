/**
 * @file Database connection.
 * @description
 * Creates the Postgres connection pool (a managed set of reusable DB connections, so we are not
 * opening a fresh socket on every query) and wraps it with Drizzle. Everything else in the server
 * imports `db` from here and never touches `pg` directly. Passing `{ schema }` is what lets us
 * write `db.query.users...` and get full autocomplete + type-checking.
 * @author Chris "Mo" Mochinski
 */

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../env.js";
import * as schema from "./schema.js";

/** Shared Postgres connection pool for the whole server. */
const pool = new Pool({ connectionString: env.databaseUrl });

/** The Drizzle database handle. Import this anywhere you need to run a query. */
export const db = drizzle(pool, { schema });
