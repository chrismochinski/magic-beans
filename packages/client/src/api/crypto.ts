/**
 * @file Crypto API calls.
 * @description
 * Thin typed wrappers over the server's crypto endpoints, using the shared axios instance. These
 * are just the HTTP calls - TanStack Query (in the `queries/` hooks) wraps them with caching,
 * loading/error state, and refetching. Return types come from `@magic-beans/shared`, so the client
 * and server agree on shape.
 * @author Chris "Mo" Mochinski
 */

import type { PositionWithMarket, MarketCoin, NewPositionInput } from "@magic-beans/shared";
import { api } from "./client";

/** Fetches the logged-in user's holdings, each enriched with live market data. */
export async function getHoldings(): Promise<PositionWithMarket[]> {
  const { data } = await api.get<PositionWithMarket[]>("/crypto/holdings");
  return data;
}

/** Fetches the top market coins (the browse/search list). */
export async function getMarketCoins(): Promise<MarketCoin[]> {
  const { data } = await api.get<MarketCoin[]>("/crypto");
  return data;
}

/** Records a new purchase. */
export async function addPosition(input: NewPositionInput): Promise<void> {
  await api.post("/crypto", input);
}

/** Updates how many coins a purchase was for. */
export async function updatePosition(id: number, coinsPurchased: number): Promise<void> {
  await api.put(`/crypto/holdings/${id}`, { coinsPurchased });
}

/** Deletes a purchase. */
export async function deletePosition(id: number): Promise<void> {
  await api.delete(`/crypto/holdings/${id}`);
}
