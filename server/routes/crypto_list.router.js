const axios = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=50&page=1&sparkline=false')
      .then(response => {
          res.send(response.data);
      }).catch(error => {
        console.log('error in crypto router:', error)
          res.sendStatus(500);
      });
});


module.exports = router; 



