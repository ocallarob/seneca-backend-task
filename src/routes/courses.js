const express = require('express');
const { json: jsonParser } = require('body-parser');

const app = express();
const router = express.Router();

app.use(jsonParser());

router.post('/:courseId', async (req, res) => {
  try {
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
