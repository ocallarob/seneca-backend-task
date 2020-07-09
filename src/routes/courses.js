const express = require('express');

const db = require('../mockDB');

const router = express.Router();

const postBodyKeys = [
  'totalModulesStudied',
  'timeStudied',
  'averageScore',
  'sessionId',
];

const isValidPostBody = (body = {}) =>
  postBodyKeys.every((key) => Object.prototype.hasOwnProperty.call(body, key));

router.post('/:courseId', async (req, res) => {
  try {
    const userId = req.get('X-User-Id');
    const {
      body,
      params: { courseId },
    } = req;
    if (!userId || !courseId || !isValidPostBody(body)) {
      return res.sendStatus(400);
    }
    const { sessionId, ...stats } = body;
    const userStats = db.get(userId) || {};
    const courseStats = userStats[courseId];
    db.update(userId, { [courseId]: { ...courseStats, [sessionId]: stats } });
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
