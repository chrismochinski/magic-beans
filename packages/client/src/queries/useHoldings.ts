/**
 * @file useHoldings query hook (WORKED EXAMPLE).
 * @description
 * This single hook replaces what used to be a Redux action + saga + reducer + selector. TanStack
 * Query's `useQuery` takes two things:
 *   - `queryKey`: a unique id for this data in the cache (an array). Anything cached under
 *     `["holdings"]` is the same query; we'll use this same key to invalidate (force a refetch)
 *     after a mutation like adding a purchase.
 *   - `queryFn`: the async function that actually fetches (our axios call).
 * It returns `{ data, isLoading, isError, error, refetch, ... }`, plus it caches the result,
 * dedupes duplicate requests, and can refetch on window focus - all for free.
 * @author Chris "Mo" Mochinski
 */

import { useQuery } from "@tanstack/react-query";
import { getHoldings } from "../api/crypto";

/** Loads the user's holdings (enriched with live market data) with caching + loading/error state. */
export function useHoldings() {
  return useQuery({
    queryKey: ["holdings"],
    queryFn: getHoldings,
  });
}
