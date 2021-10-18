const axios = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET
//UPDATED - pulls only holdings associated with that user's ID
router.get('/holdings/', (req, res) => {
  console.log('User ID is:', req.user.id)
  const getQuery = `SELECT * FROM positions WHERE user_id = $1 ORDER BY "id" ASC;`;
  pool.query(getQuery, [req.user.id]) 
    .then( result => {
        res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get user holdings:', err);
      res.sendStatus(500)
    })
});

      //GET
      //API
router.get('/', (req, res) => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    .then(response => {
      res.send(response.data);
    }).catch(error => {
      console.log('error in crypto router:', error)
      res.sendStatus(500);
    });
});

      //POST
router.post('/', (req, res) => {
  // console.log('req.body coming into POST end of /crypto router:', req.body)
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

      //DELETE
router.delete('/holdings/', (req, res) => {
  console.log('id of position to delete:', req.body.id, req.body.user_id);

  if(req.body.user_id === req.user.id) {
  const deleteQuery = `DELETE FROM "positions" WHERE "id" = $1;`;
  pool.query(deleteQuery, [req.body.id])
  .then(result => {
    res.sendStatus(201);
    console.log('success! Deleted one position')
  }).catch(error => {
    console.log('error in DELETE at crypto.router.js:', error);
    res.sendStatus(500);
    
  });} else {
    res.sendStatus(403)
  }
});



module.exports = router;



