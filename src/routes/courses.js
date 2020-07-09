const express = require('express');

const router = express.Router();

const postBodyKeys = [
  'totalModulesStudied',
  'timeStudied',
  'averageScore',
  'sessionId',
];

// eslint-disable-next-line no-prototype-builtins
const isValidPostBody = (body) =>
  postBodyKeys.every((key) => Object.prototype.hasOwnProperty.call(body, key));
router.post('/:courseId', async (req, res) => {
  try {
    const userId = req.get('X-User-Id');
    const { body } = req;

    if (!userId || !isValidPostBody(body)) return res.sendStatus(400);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
