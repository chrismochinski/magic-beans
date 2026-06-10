/**
 * @file CoinGecko service.
 * @description
 * All of our outbound calls to the CoinGecko API live here, behind typed functions. CoinGecko
 * returns snake_case JSON; we map it into our camelCase `MarketCoin` shape so the rest of the
 * server never sees their field naming. This is the "derive external data live" half of the app -
 * we never store this; we fetch it fresh. The response is validated with zod before we trust it,
 * because TypeScript types do not exist at runtime and CoinGecko is data we do not control.
 * @author Chris "Mo" Mochinski
 */

import axios from "axios";
import { z } from "zod";
import type { MarketCoin } from "@magic-beans/shared";

/** CoinGecko's public API base. The free tier is keyless but rate-limited (~10-30 calls/min). */
const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

/**
 * Runtime schema for one market row from CoinGecko. This is the actual check on data crossing our
 * boundary. The numeric fields are `.nullable()` because CoinGecko legitimately returns `null` for
 * less-established coins (an unranked coin has a null `market_cap_rank`, etc.) - being strict here
 * would reject valid responses. Unknown extra fields (CoinGecko returns ~25) are ignored by default.
 */
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

/** The validated raw shape, inferred from the schema (defined once, serving as both check + type). */
type RawMarketCoin = z.infer<typeof rawMarketCoinSchema>;

/**
 * Maps one validated CoinGecko row into our camelCase `MarketCoin`. We coalesce the occasional
 * `null` to 0 so our API shape stays clean numbers; `priceChangePercentage24h` keeps its null
 * since "no data" is meaningfully different from "0% change" for a price delta.
 *
 * @param raw - A single validated market row from CoinGecko.
 * @returns The normalized `MarketCoin`.
 */
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

/**
 * Fetches market data from CoinGecko. With no arguments it returns the top 250 coins by market cap
 * (for the browse/search list). Pass an array of coin ids to fetch just those (used to enrich a
 * user's holdings with live prices). The response is validated against `rawMarketCoinSchema` before
 * we map it, so malformed data fails loudly here instead of leaking downstream.
 *
 * @param ids - Optional CoinGecko coin ids (for example `["bitcoin", "ethereum"]`).
 * @returns The matching market coins, normalized to `MarketCoin`.
 */
export async function fetchMarketCoins(ids?: string[]): Promise<MarketCoin[]> {
  const params: Record<string, string | number | boolean> = {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 250,
    page: 1,
    sparkline: false,
  };
  if (ids && ids.length > 0) {
    params.ids = ids.join(",");
  }

  const { data } = await axios.get(`${COINGECKO_BASE}/coins/markets`, { params });

  // the bouncer: validate the external payload before the rest of the app trusts it
  const validated = z.array(rawMarketCoinSchema).parse(data);
  return validated.map(toMarketCoin);
}
