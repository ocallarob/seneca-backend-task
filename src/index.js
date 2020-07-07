const express = require('express');
const request = require('request-promise-native');

const app = express();
const router = express.Router();

router.get('/ping', async (req, res) => {
  request.get('http://google.com');
  res.send('pong');
});

app.use(router);

module.exports = app;
