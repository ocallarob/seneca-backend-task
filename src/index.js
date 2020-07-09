const express = require('express');
const { json: jsonParser } = require('body-parser');

const router = express.Router();
const app = express();

app.use(jsonParser());

router.get('/ping', async (req, res) => {
  res.send('pong');
});

const routes = require('./routes');

router.use('/', routes);

app.use(router);

module.exports = app;
