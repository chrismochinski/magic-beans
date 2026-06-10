/**
 * @file Typed environment configuration.
 * @description
 * Loads variables from `.env` (via dotenv) once, validates the required ones up front, and
 * exposes them as a typed object. Importing `env` anywhere else means no scattered
 * `process.env.WHATEVER` strings and no surprise `undefined` values deep in the app.
 * @author Chris "Mo" Mochinski
 */

import "dotenv/config";

/**
 * Reads a required environment variable, throwing a clear error if it is missing or empty. The
 * thrown message points at the most likely cause so a missing `.env` is obvious immediately.
 *
 * @param name - The environment variable name to read.
 * @returns The variable's value.
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var "${name}". Did you copy packages/server/.env.example to .env?`,
    );
  }
  return value;
}

/** Validated, typed view of the server's environment. */
export const env = {
  databaseUrl: required("DATABASE_URL"),
  sessionSecret: required("SERVER_SESSION_SECRET"),
  port: Number(process.env.PORT ?? 5000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  isProduction: process.env.NODE_ENV === "production",
};
