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

router.get('/:courseId', async (req, res) => {
  try {
    const userId = req.get('X-User-Id');
    const {
      params: { courseId },
    } = req;
    if (!userId || !courseId) {
      return res.sendStatus(400);
    }
    const userStats = db.get(userId);
    const courseStats = userStats[courseId];
    if (!courseStats) return res.sendStatus(404);

    const statsSessions = Object.keys(courseStats);
    const lifetimeStats = statsSessions.reduce(
      (statsTotals, sessionId, index) => {
        const updatedStats = { ...statsTotals };
        const sessionStats = { ...courseStats[sessionId] };

        updatedStats.totalModulesStudied += sessionStats.totalModulesStudied;
        updatedStats.averageScore += sessionStats.averageScore;
        updatedStats.timeStudied += sessionStats.timeStudied;

        if (index === statsSessions.length - 1) {
          updatedStats.totalModulesStudied /= statsSessions.length;
          updatedStats.averageScore /= statsSessions.length;
        }

        return updatedStats;
      },
      { totalModulesStudied: 0, averageScore: 0, timeStudied: 0 }
    );

    res.send(lifetimeStats);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/:courseId/sessions/:sessionId', (req, res) => {
  try {
    const userId = req.get('X-User-Id');
    const {
      params: { courseId, sessionId },
    } = req;
    if (!userId || !courseId || !sessionId) {
      return res.sendStatus(400);
    }
    const userStats = db.get(userId);
    const courseStats = userStats[courseId];
    if (!courseStats) return res.sendStatus(404);
    const sessionStats = courseStats[sessionId];
    if (!sessionStats) return res.sendStatus(404);
    res.send({ ...sessionStats, sessionId });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
