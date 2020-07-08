const express = require('express');

const app = express();
const router = express.Router();

router.get('/ping', async (req, res) => {
  res.send('pong');
});

app.use(router);

module.exports = app;
