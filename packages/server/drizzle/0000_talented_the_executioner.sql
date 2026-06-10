CREATE TABLE "position" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"coin_id" varchar(255) NOT NULL,
	"total_held" numeric(14, 4) NOT NULL,
	"total_cost" numeric(12, 2) NOT NULL,
	"per_coin_val" numeric(12, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(80) NOT NULL,
	"password" varchar(1000) NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "position" ADD CONSTRAINT "position_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;