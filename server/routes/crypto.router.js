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
      console.log('HERE IS THE QUERY RESPONSE:', result.rows)
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

// router.get('/holdings', (req, res) => {
//   const getQuery = 'SELECT * FROM "positions";';
//   pool.query(getQuery)
//   .then(result => {
//     console.log(result.rows);
//     res.send(result.rows);
//   }).catch(error => {
//     console.log('error in server GET', error);
//     res.sendStatus(500);
//   })
// });




      //GET
      //API
router.get('/', (req, res) => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=200&page=1&sparkline=false')
    .then(response => {
      res.send(response.data);
    }).catch(error => {
      console.log('error in crypto router:', error)
      res.sendStatus(500);
    });
});

      //POST
router.post('/', (req, res) => {
  console.log('req.body coming into POST end of /crypto router:', req.body)
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


// //deletelater
// router.get('/chart/:id', (req, res) => {
//   console.log('req.params.search is:', req.params.id);
//   axios.get(`https://api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
//       .then(response => {
//           console.log('crypto chart response data is:', response.data)
//           res.send(response.data);
//       }).catch(error => {
//         console.log('error in crypto router:', error)
//           res.sendStatus(500);
//       });
// });
// //deletelater

module.exports = router;



