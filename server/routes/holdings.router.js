// const axios = require('axios');
// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();

//DELETELATER whole page - good ref for now.

// //GET user holdings
// router.get('/', (req, res) => {
//     console.log('req.body for user holdings get is:', req.body)
//     const query = `SELECT * FROM positions ORDER BY "id" ASC`;
//     pool.query(query) 
//       .then( result => {
//         res.send(result.rows);
//       })
//       .catch(err => {
//         console.log('ERROR: Get all movies', err);
//         res.sendStatus(500)
//       })
//   });

//   router.get('/', (req, res) => {
//     const getQuery = 'SELECT * FROM "item";'
//     pool.query(getQuery)
//     .then(result => {
//       console.log(result.rows);
//       res.send(result.rows);
//     }).catch(error => {
//       console.log('error in server GET', error);
//       res.sendStatus(500);
//     })
//   });
  


// module.exports = router;