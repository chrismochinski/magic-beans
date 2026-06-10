/**
 * @file Drizzle Kit configuration.
 * @description
 * Drizzle Kit is the command-line tool side of Drizzle. It reads our schema (the TypeScript table
 * definitions), compares it to what migrations already exist, and generates SQL migration files
 * into the `drizzle/` folder. `db:migrate` then runs those files against the database in
 * DATABASE_URL. We load dotenv here because Drizzle Kit runs as its own process and would not
 * otherwise see the `.env` file.
 * @author Chris "Mo" Mochinski
 */

import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  // prints the SQL Drizzle generates, which is handy while you are learning what maps to what
  verbose: true,
  strict: true,
});
