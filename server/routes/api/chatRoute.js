const express = require('express');
const router = express.Router();
const app = express();
const http = require('http').createServer(app);

// http://localhost:5000/chat
router.get('/', function(req, res, next) {
  res.send('Express REST API');
});

module.exports = router;