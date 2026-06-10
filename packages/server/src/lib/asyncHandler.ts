/**
 * @file Async route wrapper.
 * @description
 * Express 4 does not catch errors thrown inside async route handlers - a rejected promise would
 * otherwise crash quietly. Wrapping a handler in `asyncHandler` forwards any thrown/rejected error
 * to Express's error-handling middleware (the `next(err)` path), so one central handler can format
 * the response. Saves a try/catch in every route.
 * @author Chris "Mo" Mochinski
 */

import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an async route handler so any rejection is passed to Express's error middleware.
 *
 * @param fn - The async route handler to wrap.
 * @returns A normal Express handler that cannot leak an unhandled rejection.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
