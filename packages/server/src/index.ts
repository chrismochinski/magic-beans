/**
 * @file Server entry point.
 * @description
 * Boots the Express app: shared middleware (CORS + JSON body parsing), then routes, then starts
 * listening. Right now it only exposes a health check so we can confirm the server runs; we will
 * mount the auth and crypto routers here as we build them.
 * @author Chris "Mo" Mochinski
 */

import express from "express";
import cors from "cors";
import { env } from "./env.js";

const app = express();

// CORS (Cross-Origin Resource Sharing): the client runs on a different port than the API in dev,
// so the browser needs explicit permission to call us. `credentials: true` will let the session
// cookie ride along once auth is wired up.
app.use(cors({ origin: env.clientOrigin, credentials: true }));

// Parse incoming JSON request bodies into req.body.
app.use(express.json());

// Simple health check, handy for "is the server even up?" and later for deploy platforms.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.listen(env.port, () => {
  console.log(`Magic Beans API listening on http://localhost:${env.port}`);
});
