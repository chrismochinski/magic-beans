/**
 * @file Holdings aggregation.
 * @description
 * The API returns one row per PURCHASE. For the dashboard we want one row per COIN, so we group the
 * purchases by `coinId` and roll them up: total coins, total invested, current value, and gain/loss.
 * This is the "the UI aggregates rows by coin" step the per-purchase model was designed for.
 * @author Chris "Mo" Mochinski
 */

import type { PositionWithMarket } from "@magic-beans/shared";

/** A per-coin rollup of all of a user's purchases of that coin. */
export interface CoinHolding {
  coinId: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  /** Sum of coins across all purchases of this coin. */
  totalCoins: number;
  /** Sum of (coinsPurchased * pricePerFullCoin) across purchases - the cost basis. */
  totalInvested: number;
  /** totalCoins * currentPrice. */
  currentValue: number;
  /** currentValue - totalInvested (positive = profit). */
  gainLoss: number;
  /** gainLoss as a percentage of totalInvested. */
  gainLossPct: number;
  /** How many separate purchases make up this holding. */
  purchaseCount: number;
}

/**
 * Rolls a flat list of purchases up into one entry per coin, sorted by current value (largest
 * first).
 *
 * @param positions - The purchases, each enriched with live market data.
 * @returns One aggregated holding per distinct coin.
 */
export function aggregateHoldings(positions: PositionWithMarket[]): CoinHolding[] {
  const byCoin = new Map<string, CoinHolding>();

  for (const p of positions) {
    const invested = p.coinsPurchased * p.pricePerFullCoin;
    const existing = byCoin.get(p.coinId);
    if (existing) {
      existing.totalCoins += p.coinsPurchased;
      existing.totalInvested += invested;
      existing.purchaseCount += 1;
    } else {
      byCoin.set(p.coinId, {
        coinId: p.coinId,
        name: p.name,
        symbol: p.symbol,
        image: p.image,
        currentPrice: p.currentPrice,
        totalCoins: p.coinsPurchased,
        totalInvested: invested,
        currentValue: 0,
        gainLoss: 0,
        gainLossPct: 0,
        purchaseCount: 1,
      });
    }
  }

  // finalize the derived fields now that the sums are complete
  return [...byCoin.values()]
    .map((h) => {
      const currentValue = h.totalCoins * h.currentPrice;
      const gainLoss = currentValue - h.totalInvested;
      const gainLossPct = h.totalInvested > 0 ? (gainLoss / h.totalInvested) * 100 : 0;
      return { ...h, currentValue, gainLoss, gainLossPct };
    })
    .sort((a, b) => b.currentValue - a.currentValue);
}
