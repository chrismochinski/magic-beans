/**
 * @file Axios API client.
 * @description
 * One configured axios instance the whole app shares. `baseURL` points at the server's `/api`
 * prefix (from `VITE_API_URL`, falling back to local dev), so calls read like
 * `api.get("/crypto/holdings")`. `withCredentials` lets the session cookie ride along once auth is
 * wired up. TanStack Query handles caching/loading/errors on top of this; axios just does the HTTP.
 * @author Chris "Mo" Mochinski
 */

import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

/** Shared axios instance for all API calls. */
export const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  withCredentials: true,
});
