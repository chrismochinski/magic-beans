/**
 * @file useMarketCoins query hook.
 * @description
 * Loads the list of coins available in the market (from Coingecko) with caching + loading/error
 * state. This is a simple wrapper around `useQuery` that gives it a unique `queryKey` and our API
 * call as the `queryFn`. The component just calls this hook and gets all the benefits of TanStack
 * Query - caching, deduping, refetching on window focus, and more - for free, with no extra code.
 * The `data` returned is exactly the array of coins from our API, with no manual flags or nesting -
 * just what we need to render the coin search dropdown.
 * @author Chris "Mo" Mochinski
 */

import { useQuery } from "@tanstack/react-query";
import { getMarketCoins } from "../api/crypto";

export function useMarketCoins() {
  return useQuery({
    queryKey: ["marketCoins"],
    queryFn: getMarketCoins,
  });
}