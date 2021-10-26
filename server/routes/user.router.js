const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

/**
 * @apiError {json} Error Example:
 * 
 * User registration failed:  error: duplicate key value violates unique constraint "user_username_key"
    at Parser.parseErrorMessage (/Users/chrismochinski/Desktop/Prime/Tier3/magic-beans/node_modules/pg-protocol/dist/parser.js:287:98)
    at Parser.handlePacket (/Users/chrismochinski/Desktop/Prime/Tier3/magic-beans/node_modules/pg-protocol/dist/parser.js:126:29)
    at Parser.parse (/Users/chrismochinski/Desktop/Prime/Tier3/magic-beans/node_modules/pg-protocol/dist/parser.js:39:38)
    at Socket.<anonymous> (/Users/chrismochinski/Desktop/Prime/Tier3/magic-beans/node_modules/pg-protocol/dist/index.js:11:42)
    at Socket.emit (node:events:394:28)
    at addChunk (node:internal/streams/readable:315:12)
    at readableAddChunk (node:internal/streams/readable:289:9)
    at Socket.Readable.push (node:internal/streams/readable:228:10)
    at TCP.onStreamRead (node:internal/stream_base_commons:199:23) {
  length: 200,
  severity: 'ERROR',
  code: '23505',
  detail: 'Key (username)=(mo) already exists.',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'user',
  column: undefined,
  dataType: undefined,
  constraint: 'user_username_key',
  file: 'nbtinsert.c',
  line: '656',
  routine: '_bt_check_unique'
}
 */
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
