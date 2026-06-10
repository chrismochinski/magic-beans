/**
 * @file Drizzle database schema.
 * @description
 * This file IS the database structure, expressed in TypeScript. Drizzle Kit reads it to generate
 * SQL migrations, and Drizzle ORM reads it to give every query full type-safety. The string passed
 * to each helper (for example `varchar("username")`) is the real snake_case column name in
 * Postgres; the JS property name (for example `username`) is what we use in code.
 * @author Chris "Mo" Mochinski
 */

import { pgTable, serial, varchar, integer, numeric, timestamp } from "drizzle-orm/pg-core";

/**
 * The `user` table - login accounts. "user" is a reserved word in Postgres (your old database.sql
 * warned about this), but Drizzle quotes every identifier for us, so we can safely name it "user".
 * We only ever store the bcrypt HASH in `password`, never the real password.
 *
 * Column-by-column, for reference:
 * - serial(...)       -> auto-incrementing integer, the classic primary key (PK: the unique id
 *                        for each row).
 * - .primaryKey()     -> marks it as that unique id.
 * - varchar(name,len) -> variable-length text with a max length.
 * - .notNull()        -> the column may not be empty.
 * - .unique()         -> no two rows may share this value (two users can't have the same username).
 */
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 80 }).notNull().unique(),
  password: varchar("password", { length: 1000 }).notNull(),
});

/**
 * Drizzle can INFER row types straight from the table definition, so we never hand-write them.
 * `UserRow` is the shape of a row you SELECT; `NewUserRow` is the shape you INSERT (it omits the
 * auto-generated `id`). This is the payoff of a TypeScript-first ORM.
 */
export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;

/**
 * The `position` table - the coins that users hold. Each row is a single coin in a user's portfolio.
 * The `user_id` column is a foreign key that references the `id` in the `user` table
 */
export const positions = pgTable("position", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id), 
  coinId: varchar("coin_id", {length: 255}).notNull(),
  // coinSymbol: varchar("coin_symbol", {length: 10}), // > DROPPED - derive from Coingecko API
  // coinName: varchar("coin_name", {length: 100}), // > DROPPED - derive from Coingecko API
  totalHeld: numeric("total_held", {precision: 14, scale: 4}).notNull(),
  totalCost: numeric("total_cost", {precision: 12, scale: 2}).notNull(),
  perCoinVal: numeric("per_coin_val", {precision: 12, scale: 2}).notNull(),
  createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
});

export type PositionRow = typeof positions.$inferSelect;
export type NewPositionRow = typeof positions.$inferInsert;
