const axios = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * @api {get}
 * /crypto/holdings/
 * @apiParams {Number} id user's unique id
 * get all user's portfolio positions
 */
router.get('/holdings/', (req, res) => {
  console.log('User ID is:', req.user.id)
  const getQuery = `SELECT * FROM positions WHERE user_id = $1 ORDER BY "id" ASC;`;
  pool.query(getQuery, [req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get user holdings:', err);
      res.sendStatus(500)
    })
});

/**
 * @api {get}
 * /crypto/
 * get top 250 crypto list (top 250 subject to change)
 */
router.get('/', (req, res) => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    .then(response => {
      res.send(response.data);
    }).catch(error => {
      console.log('error in crypto router:', error)
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
router.post('/', (req, res) => {
  const queryText = `INSERT INTO "positions"
  ("user_id", "coin_id", "symbol", "name",
  "coins_held", "total_cost", "per_coin_val")
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool.query(queryText, [
    req.body.user_id,
    req.body.coin_id,
    req.body.symbol,
    req.body.name,
    req.body.coins_held,
    req.body.total_cost,
    req.body.per_coin_val
  ]).then(result => {
    res.sendStatus(201);
  }).catch(error => {
    console.log('error in post router:', error)
    res.sendStatus(500)
  })
})

/**
 * @api {delete} /crypto/holdings
 * /crypto/holdings/
 * @apiParams {String} id unique id of coin
 * @apiParams {Number} user_id unique id of user
 */
router.delete('/holdings/', (req, res) => {
  console.log('id of position to delete:', req.body.id, req.body.user_id);

  if (req.body.user_id === req.user.id) {
    const deleteQuery = `DELETE FROM "positions" WHERE "id" = $1;`;
    pool.query(deleteQuery, [req.body.id])
      .then(result => {
        res.sendStatus(201);
        console.log('success! Deleted one position')
      }).catch(error => {
        console.log('error in DELETE at crypto.router.js:', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403)
  }
});

/**
 * @api {put}
 * /crypto/holdings/
 * @apiParams {String} id unique coin id
 * @apiParams {Number} mod updated number of coins held
 * @apiParams {Number} user_id unique user id
 */
router.put('/holdings/', (req, res) => {
  console.log('id of position to UPDATE:', req.body.id, req.body.mod, req.body.user_id);

  if (req.body.user_id === req.user.id) {
    const updateQuery = `UPDATE "positions" SET "coins_held" = $1 WHERE "id" = $2;`;
    pool.query(updateQuery, [req.body.mod, req.body.id])
      .then(result => {
        res.sendStatus(201);
        console.log('success! Updated position w/ id', req.body.id, 'to new total of', req.body.mod);
      }).catch(error => {
        console.log('error in DELETE at crypto.router.js:', error);
        res.sendStatus(500);

      });
  } else {
    res.sendStatus(403)
  }
});



module.exports = router;



