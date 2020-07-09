const express = require('express');

const router = express.Router();
const app = express();

router.get('/ping', async (req, res) => {
  res.send('pong');
});

const routes = require('./routes');

router.use('/', routes);

app.use(router);

module.exports = app;
