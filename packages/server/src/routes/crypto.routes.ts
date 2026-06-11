/**
 * @file Crypto routes.
 * @description
 * The REST endpoints for market data and a user's holdings ("positions"). This is where the
 * "shipping clerk" translation happens: we read rows from Postgres (where `numeric` columns arrive
 * as strings), convert them to the clean `Position`/`PositionWithMarket` API shapes, and enrich
 * holdings with live CoinGecko prices before sending them out. Auth is still stubbed, so every
 * request acts as the dev user via `getCurrentUserId`.
 * @author Chris "Mo" Mochinski
 */

import { Router } from "express";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import type { Position, PositionWithMarket } from "@magic-beans/shared";
import { db } from "../db/index.js";
import { positions, type PositionRow } from "../db/schema.js";
import { fetchMarketCoins } from "../services/coingecko.js";
import { getCurrentUserId } from "../lib/currentUser.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const cryptoRouter = Router();

/**
 * Converts a raw database row into the API `Position` shape. The key job: Postgres `numeric`
 * columns come back as strings (to preserve exact precision), so we parse them to numbers here, at
 * the boundary, exactly once.
 *
 * @param row - A position row as returned by Drizzle.
 * @returns The position in API shape.
 */
function toPosition(row: PositionRow): Position {
  return {
    id: row.id,
    userId: row.userId,
    coinId: row.coinId,
    coinsPurchased: Number(row.coinsPurchased),
    pricePerFullCoin: Number(row.pricePerFullCoin),
    purchasedAt: row.purchasedAt.toISOString(),
  };
}

/**
 * GET /api/crypto
 * The market browse/search list: the top coins by market cap, straight from CoinGecko. No auth and
 * no database - a thin live proxy.
 */
cryptoRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const coins = await fetchMarketCoins();
    res.json(coins);
  }),
);

/**
 * GET /api/crypto/holdings
 * The logged-in user's portfolio. Reads their positions from the database, then enriches each one
 * with live market data (name, symbol, logo, current price) looked up from CoinGecko by coinId.
 * Returns `PositionWithMarket[]`.
 */
cryptoRouter.get(
  "/holdings",
  asyncHandler(async (req, res) => {
    const userId = getCurrentUserId(req);

    const rows = await db
      .select()
      .from(positions)
      .where(eq(positions.userId, userId))
      .orderBy(positions.id);

    const myPositions = rows.map(toPosition);
    if (myPositions.length === 0) {
      res.json([]);
      return;
    }

    // one CoinGecko call for all the coins this user holds (de-duplicated)
    const uniqueIds = [...new Set(myPositions.map((p) => p.coinId))];
    const market = await fetchMarketCoins(uniqueIds);
    const marketById = new Map(market.map((coin) => [coin.id, coin]));

    const enriched: PositionWithMarket[] = myPositions.map((p) => {
      const coin = marketById.get(p.coinId);
      return {
        ...p,
        name: coin?.name ?? p.coinId,
        symbol: coin?.symbol ?? "",
        image: coin?.image ?? "",
        currentPrice: coin?.currentPrice ?? 0,
      };
    });

    res.json(enriched);
  }),
);

/** Validates the body for creating a position. `coerce` is forgiving if a number arrives as text. */
const newPositionSchema = z.object({
  coinId: z.string().min(1),
  coinsPurchased: z.coerce.number().positive(),
  pricePerFullCoin: z.coerce.number().positive(),
});

/**
 * POST /api/crypto
 * Creates a new position for the logged-in user. Validates the body with zod first (never trust the
 * client), then inserts. Note we convert numbers back to strings for the `numeric` columns - the
 * mirror image of what `toPosition` does on the way out.
 */
cryptoRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const userId = getCurrentUserId(req);

    const parsed = newPositionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const input = parsed.data;

    const [created] = await db
      .insert(positions)
      .values({
        userId,
        coinId: input.coinId,
        coinsPurchased: String(input.coinsPurchased),
        pricePerFullCoin: String(input.pricePerFullCoin),
      })
      .returning();

    res.status(201).json(toPosition(created!));
  }),
);

/**
 * DELETE  /api/crypto/holdings/:id
 */
cryptoRouter.delete(
  "/holdings/:id",
  asyncHandler(async (req, res) => {
    const userId = getCurrentUserId(req);
    const id = Number(req.params.id);
    
    const deleted = await db
      .delete(positions)
      .where(and(eq(positions.id, id), eq(positions.userId, userId)))
      .returning(); 
    
    res.status(deleted.length > 0 ? 204 : 404).send();
  }), 
);

/**
 * PUT /api/crypto/holdings/:id
 */
cryptoRouter.put(
  "/holdings/:id",
  asyncHandler(async (req, res) => {
    const userId = getCurrentUserId(req);
    const id = Number(req.params.id);

    const bodySchema = z.object({
      coinsPurchased: z.coerce.number().positive(),
    });

    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const input = parsed.data;

    const [updated] = await db
      .update(positions)
      .set({ coinsPurchased: String(input.coinsPurchased) })
      .where(and(eq(positions.id, id), eq(positions.userId, userId)))
      .returning();

    if (!updated) {
      res.sendStatus(404);
      return;
    }

    res.json(toPosition(updated));
  }),
);


/** 
 * DELETE /api/crypto/holdings/coin/:coinId
 */
cryptoRouter.delete(
  "/holdings/coin/:coinId",
  asyncHandler(async (req, res) => {
    const userId = getCurrentUserId(req);
    const coinId = req.params.coinId;
    if (!coinId) {
      res.status(400).json({ error: "coinId is required" });
      return;
    }

    const deleted = await db
      .delete(positions)
      .where(and(eq(positions.coinId, coinId), eq(positions.userId, userId)))
      .returning();

    res.status(deleted.length > 0 ? 204 : 404).send();
  }),
);  