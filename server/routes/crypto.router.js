const axios = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=200&page=1&sparkline=false')
      .then(response => {
          res.send(response.data);
      }).catch(error => {
        console.log('error in crypto router:', error)
          res.sendStatus(500);
      });
});


//deletelater
router.get('/chart/:id', (req, res) => {
  console.log('req.params.search is:', req.params.id);
  axios.get(`https://api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
      .then(response => {
          console.log('crypto chart response data is:', response.data)
          res.send(response.data);
      }).catch(error => {
        console.log('error in crypto router:', error)
          res.sendStatus(500);
      });
});
//deletelater

module.exports = router; 



