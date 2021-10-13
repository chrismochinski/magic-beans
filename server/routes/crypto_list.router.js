const axios = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//updated no way this is gonna work...
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


//DELETELATER
// router.get('/:search', (req, res) => {
//     console.log('req.params.search is:', req.params.search);
//     axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&limit=10&offset=0&rating=g&lang=en&q=${req.params.search}`)
//     .then(response => {
//         console.log('linking router response.data is:', response.data)
//             res.send(response.data);
//         }).catch(error => {
//             console.log('Error:', error);
        
//             res.sendStatus(500);
//         });
// });


