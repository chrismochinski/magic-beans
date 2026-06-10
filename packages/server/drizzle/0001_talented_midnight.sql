ALTER TABLE "position" RENAME COLUMN "total_held" TO "coins_purchased";--> statement-breakpoint
ALTER TABLE "position" RENAME COLUMN "per_coin_val" TO "price_per_full_coin";--> statement-breakpoint
ALTER TABLE "position" DROP COLUMN "total_cost";