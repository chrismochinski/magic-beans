/**
 * @file Shared domain types for Magic Beans.
 * @description
 * These types are the single contract between the server and the client. Both packages import
 * from `@magic-beans/shared`, so a change here surfaces as a type error on whichever side falls
 * out of sync. Domain fields use camelCase; the database columns are snake_case and get mapped
 * back to these names by Drizzle in the server's schema.
 * @author Chris "Mo" Mochinski
 */

/**
 * A registered user, as the API exposes it. The password hash lives only in the database and is
 * never included in any response, so it is intentionally absent from this type.
 */
export interface User {
  id: number;
  username: string;
}

/**
 * One crypto holding owned by a user (the app calls these "positions"). Money and quantity fields
 * are plain numbers here for ergonomics; Postgres stores them as fixed-precision NUMERIC, which is
 * the correct way to avoid float drift at the storage layer.
 */
export interface Position {
  id: number;
  userId: number;
  /** CoinGecko's lowercase id, for example "bitcoin". The single link to all live market data. */
  coinId: string;
  /** How many coins this purchase was for (often a fraction, for example 0.5 BTC). */
  coinsPurchased: number;
  /** Price of one whole coin at the moment of this purchase, in USD. A historical fact. */
  pricePerFullCoin: number;
  /** ISO timestamp of when the position was created. */
  createdAt: string;
}

/**
 * A stored `Position` enriched with live market data looked up from CoinGecko by `coinId`. The
 * server builds this by joining each position with the current market snapshot; the client renders
 * it. These extra fields are NOT stored in our database (they would go stale) - they are derived
 * fresh on every request.
 */
export interface PositionWithMarket extends Position {
  /** Display name, for example "Bitcoin". */
  name: string;
  /** Ticker symbol, for example "btc". */
  symbol: string;
  /** URL to the coin's logo image. */
  image: string;
  /** Current price per coin in USD, right now. */
  currentPrice: number;
}

/**
 * The payload a client sends to create a new position. The server fills in `id`, `userId` (from
 * the logged-in session), and `createdAt`, so the client never provides those.
 */
export type NewPositionInput = Omit<Position, "id" | "userId" | "createdAt">;

/**
 * The payload to update an existing position. For now only the purchased quantity is editable,
 * matching the original app's "modify" feature.
 */
export interface UpdatePositionInput {
  id: number;
  coinsPurchased: number;
}

/**
 * A single row of market data as returned by CoinGecko's `/coins/markets` endpoint. This is only
 * the subset of fields the app actually uses; CoinGecko returns many more.
 */
export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  totalVolume: number;
  priceChangePercentage24h: number | null;
}

/** Username and password, used for both login and registration. */
export interface Credentials {
  username: string;
  password: string;
}
