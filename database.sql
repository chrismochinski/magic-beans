
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- Positions table to store user's stuff
CREATE TABLE "positions" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "coin_id" VARCHAR(255),
    "symbol" VARCHAR(10),
    "name" VARCHAR(100),
    "coins_held" DECIMAL(14,4),
    "total_cost" DECIMAL(12,2),
    "per_coin_val" DECIMAL(12,2),
    "date_time" DEFAULT GETDATE(),
);


-- Sample starting query TBD

