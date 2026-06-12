/**
 * @file Server entry point.
 * @description
 * Boots the Express app: shared middleware (CORS + JSON body parsing), then the route modules, then
 * a central error handler, then starts listening. As we add features (auth next), we mount their
 * routers here alongside the crypto routes.
 * @author Chris "Mo" Mochinski
 */

import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { env } from "./env.js";
import { cryptoRouter } from "./routes/crypto.routes.js";

const app = express();

// CORS (Cross-Origin Resource Sharing): the client runs on a different port than the API in dev,
// so the browser needs explicit permission to call us. `credentials: true` will let the session
// cookie ride along once auth is wired up.
app.use(cors({ origin: env.clientOrigin, credentials: true }));

// Parse incoming JSON request bodies into req.body.
app.use(express.json());

// Dev-only request logger: prints each request + status + timing to the terminal (like Vite's HMR
// lines), so you can watch refetches land when the client invalidates. Silent in production.
if (!env.isProduction) {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      console.log(`→ ${req.method} ${req.originalUrl} ${res.statusCode} (${Date.now() - start}ms)`);
    });
    next();
  });
}

// Simple health check, handy for "is the server even up?" and later for deploy platforms.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Feature routes.
app.use("/api/crypto", cryptoRouter);

// Central error handler. Any error forwarded by asyncHandler lands here, so we log it once and send
// a clean 500 instead of leaking a stack trace to the client. Must be defined AFTER the routes, and
// must take all four args for Express to recognize it as an error handler.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Magic Beans API listening on http://localhost:${env.port}`);
});
