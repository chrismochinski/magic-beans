/**
 * @file CoinGecko service.
 * @description
 * All outbound CoinGecko calls live here. CoinGecko returns snake_case JSON; we validate it with
 * zod and map it into our camelCase `MarketCoin`. CoinGecko's free tier rate-limits hard (~10-30
 * calls/min), so we cache the top-250 list in memory for 60s and serve BOTH the market list and
 * holdings enrichment from it - that caps us at roughly one CoinGecko call per minute regardless of
 * traffic. If a refresh fails (for example a 429), we serve the last good cache instead of erroring.
 * @author Chris "Mo" Mochinski
 */

import axios from "axios";
import { z } from "zod";
import type { MarketCoin } from "@magic-beans/shared";
import { env } from "../env.js";

/** CoinGecko's public API base. */
const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

/** How long a cached market snapshot is considered fresh. */
const CACHE_TTL_MS = 60_000;

/** Runtime schema for one market row. Numeric fields are nullable - CoinGecko returns null for some
 * less-established coins, and being strict would reject valid responses. Extra fields are ignored. */
const rawMarketCoinSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number().nullable(),
  market_cap: z.number().nullable(),
  market_cap_rank: z.number().nullable(),
  total_volume: z.number().nullable(),
  price_change_percentage_24h: z.number().nullable(),
});

type RawMarketCoin = z.infer<typeof rawMarketCoinSchema>;

/** Maps one validated CoinGecko row into our camelCase `MarketCoin`. */
function toMarketCoin(raw: RawMarketCoin): MarketCoin {
  return {
    id: raw.id,
    symbol: raw.symbol,
    name: raw.name,
    image: raw.image,
    currentPrice: raw.current_price ?? 0,
    marketCap: raw.market_cap ?? 0,
    marketCapRank: raw.market_cap_rank ?? 0,
    totalVolume: raw.total_volume ?? 0,
    priceChangePercentage24h: raw.price_change_percentage_24h,
  };
}

/** The last successful market snapshot, with when we fetched it. */
let cache: { coins: MarketCoin[]; fetchedAt: number } | null = null;

/** Does the actual network call for the top 250 coins by market cap. */
async function fetchTop250(): Promise<MarketCoin[]> {
  const { data } = await axios.get(`${COINGECKO_BASE}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 250,
      page: 1,
      sparkline: false,
    },
    // a free CoinGecko "demo" API key (optional) raises the rate limit; sent only if present
    headers: env.coingeckoApiKey ? { "x-cg-demo-api-key": env.coingeckoApiKey } : undefined,
  });
  return z.array(rawMarketCoinSchema).parse(data).map(toMarketCoin);
}

/**
 * Returns the top-250 market coins, cached for 60s. The market list route and holdings enrichment
 * both call this, so CoinGecko sees at most ~one request per minute. On a fetch failure we serve the
 * last good cache (if any) rather than throwing, so a transient rate-limit doesn't break the app.
 *
 * @returns The current (possibly cached) market coins.
 */
/** Dev-only cache logger - prints to the terminal in development, silent in production. */
function logCache(message: string): void {
  if (!env.isProduction) console.log(`[cache] ${message}`);
}

export async function getMarketCoins(): Promise<MarketCoin[]> {
  const now = Date.now();

  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    const ageSec = Math.round((now - cache.fetchedAt) / 1000);
    logCache(`🟢 HIT - ${cache.coins.length} coins from memory (age ${ageSec}s), no CoinGecko call`);
    return cache.coins;
  }

  logCache("🔵 MISS - fetching fresh from CoinGecko...");
  try {
    const coins = await fetchTop250();
    cache = { coins, fetchedAt: now };
    logCache(`✅ fetched ${coins.length} coins, cached for ${CACHE_TTL_MS / 1000}s`);
    return coins;
  } catch (error) {
    if (cache) {
      const ageSec = Math.round((now - cache.fetchedAt) / 1000);
      logCache(`🟡 CoinGecko failed - serving STALE cache (age ${ageSec}s): ${(error as Error).message}`);
      return cache.coins;
    }
    logCache(`🔴 CoinGecko failed, no cache to fall back on: ${(error as Error).message}`);
    throw error;
  }
}
