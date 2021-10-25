const axios = require("axios");
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * @api {get} /crypto/holdings Get user holdings
 * @apiName GetPositions
 * @apiGroup Crypto
 * @apiDesription This route returns all user's current holdings (aka "positions")
 * 
 * @apiSuccess {Group[]} Positions  An array of user holding information
 * @apiSuccess {Number} positions.user_id   User's unique id, populated by whomever is logged in
 * @apiSuccess {String} positions.coin_id   Coin's unique id - a lower case version of name with no spaces
 * @apiSuccess {String} positions.symbol    Coin's unique symbol - three to five letters
 * @apiSuccess {String} positions.name    Coin's name - similar to id, with caps
 * @apiSuccess {Number} positions.coins_held    Number of coins user holds of that crypto
 * @apiSuccess {Number} position.total_cost   Amount user "spent" on that position
 * @apiSuccess {Number} position.per_coin_val   Price per coin at time of "purchase"
 * @apiSuccess {String} position.date   Date of "purchase" of position
 * 
 * @apiSuccessExample {json} Success-Response:
 * 
 *  [
  {
    id: 104,
    user_id: 2,
    coin_id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    coins_held: '0.0311',
    total_cost: '1940.01',
    per_coin_val: '62329.00',
    date: 2021-10-17T05:00:00.000Z
  }
],
 */
router.get("/holdings/", rejectUnauthenticated, (req, res) => {
  //auth check
  console.log("User ID is:", req.user.id);
  const getQuery = `SELECT * FROM positions WHERE user_id = $1 ORDER BY "id" ASC;`;
  pool
    .query(getQuery, [req.user.id])
    .then((result) => {
      res.send(result.rows);
      console.log("result is:", result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get user holdings:", err);
      res.sendStatus(500);
    });
});

/**
 * @api {post} /crypto User input new holding info
 * @apiName PostNewPosition
 * @apiGroup crypto
 *
 *
 * @apiDescription This route runs when a user submits a brand new holding
 *
 */
router.get("/", (req, res) => {
  axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log("error in crypto router:", error);
      res.sendStatus(500);
    });
});

/**
 * @api {post}
 * /crypto/
 * @apiParam {Number} user_id user's unique ID
 * @apiParam {String} coin_id coin's unique ID
 * @apiParam {String} symbol coin's unique ticker symbol
 * @apiParam {String} name coin's unique full name
 * @apiParam {Number} coins_held number of coins user has added
 * @apiParam {Number} total_cost total USD amount user "spent" on addition
 * @apiParam {Number} per_coin_val value of coin at precise time of addition
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  //auth check
  const queryText = `INSERT INTO "positions"
  ("user_id", "coin_id", "symbol", "name",
  "coins_held", "total_cost", "per_coin_val")
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [
      req.body.user_id,
      req.body.coin_id,
      req.body.symbol,
      req.body.name,
      req.body.coins_held,
      req.body.total_cost,
      req.body.per_coin_val,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in post router:", error);
      res.sendStatus(500);
    });
});

/**
 * @api {delete} /crypto/holdings
 * /crypto/holdings/
 * @apiParams {String} id unique id of coin
 * @apiParams {Number} user_id unique id of user
 */
router.delete("/holdings/", rejectUnauthenticated, (req, res) => {
  //auth check
  console.log("id of position to delete:", req.body.id, req.body.user_id);

  if (req.body.user_id === req.user.id) {
    const deleteQuery = `DELETE FROM "positions" WHERE "id" = $1 AND "user_id" = $2;`;
    pool
      .query(deleteQuery, [req.body.id, req.user.id]) //auth check
      .then((result) => {
        res.sendStatus(201);
        console.log("success! Deleted one position");
      })
      .catch((error) => {
        console.log("error in DELETE at crypto.router.js:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * @api {put}
 * /crypto/holdings/
 * @apiParams {String} id unique coin id
 * @apiParams {Number} mod updated number of coins held
 * @apiParams {Number} user_id unique user id
 */
router.put("/holdings/", rejectUnauthenticated, (req, res) => {
  //auth check
  console.log(
    "id of position to UPDATE:",
    req.body.id,
    req.body.mod,
    req.body.user_id
  );

  if (req.body.user_id === req.user.id) {
    const updateQuery = `
    UPDATE "positions" SET "coins_held" = $1 WHERE "id" = $2 AND "user_id" = $3;`; //auth check
    pool
      .query(updateQuery, [req.body.mod, req.body.id, req.user.id]) //auth check
      .then((result) => {
        res.sendStatus(201);
        console.log(
          "success! Updated position w/ id",
          req.body.id,
          "to new total of",
          req.body.mod
        );
      })
      .catch((error) => {
        console.log("error in DELETE at crypto.router.js:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
