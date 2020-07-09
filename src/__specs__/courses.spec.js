const request = require('supertest');
const {
  random: { uuid, number },
} = require('faker');

const app = require('..');
const db = require('../mockDB');

describe('/courses', () => {
  describe('When POST /{courseId}', () => {
    const courseId = uuid();
    const userId = uuid();
    const sessions = [uuid(), uuid(), uuid()];

    sessions.forEach((sessionId, index) => {
      const courseStatsDiff = {
        totalModulesStudied: number(14) + 1, // 15 module types (non 0)
        averageScore: number(100), // Assume scores in %
        timeStudied: number() + 10000, // Believable time (min 10 Sec?)
      };
      const stats = { ...courseStatsDiff, sessionId };
      it('Should return 201 OK and course lifetime stats Object', async () => {
        await request(app)
          .post(`/courses/${courseId}`)
          .set({ 'X-User-Id': userId })
          .send(stats)
          .expect(201);
        if (index === sessions.length - 1) {
          const userStats = db.get(userId)[courseId];
          expect(Object.keys(userStats).length).toEqual(sessions.length);
        }
      });

      it('Should allow implict session edits', async () => {
        if (index === sessions.length - 1) {
          const storedStats = db.get(userId)[courseId][sessionId];
          const newStats = { ...stats, averageScore: number(100) };
          await request(app)
            .post(`/courses/${courseId}`)
            .set({ 'X-User-Id': userId })
            .send(newStats)
            .expect(201);
          const editedStats = db.get(userId)[courseId][sessionId];
          expect(editedStats.averageScore).not.toEqual(
            storedStats.averageScore
          );
          expect(editedStats.averageScore).toEqual(newStats.averageScore);
        }
      });

      it('Should return 400 for missing stats', async () => {
        const missingStat = Object.keys(stats).sort()[index];
        delete stats[missingStat];
        await request(app)
          .post(`/courses/${courseId}`)
          .set({ 'X-User-Id': userId })
          .send(stats)
          .expect(400);
      });
    });

    it('Should reject requests missing X-User-Id', async () => {
      await request(app).post(`/courses/${courseId}`).send({}).expect(400);
    });
  });

  describe('When GET /{courseId}', () => {
    const courseId = uuid();
    const userId = uuid();
    const sessions = [uuid(), uuid(), uuid()];
    const sessionData = {};

    const lifetimeStats = {
      totalModulesStudied: 0,
      averageScore: 0,
      timeStudied: 0,
    };

    beforeEach((done) => {
      sessions.forEach((sessionId, index) => {
        const courseStatsDiff = {
          totalModulesStudied: number(14) + 1, // 15 module types (non 0)
          averageScore: number(100), // Assume scores in %
          timeStudied: number() + 10000, // Believable time (min. 10 Sec?)
        };
        const userStats = db.get(userId) || {};
        db.update(userId, {
          [courseId]: { ...userStats[courseId], [sessionId]: courseStatsDiff },
        });

        sessionData[sessionId] = { sessionId, ...courseStatsDiff };

        Object.keys(courseStatsDiff).forEach((key) => {
          lifetimeStats[key] += Number(courseStatsDiff[key]);
        });

        if (index === sessions.length - 1) {
          done();
        }
      });
    });

    it('Should return lifetime stats for the user in that course', async () => {
      lifetimeStats.totalModulesStudied /= sessions.length; // very ugly operator...
      lifetimeStats.averageScore /= sessions.length;

      await request(app)
        .get(`/courses/${courseId}`)
        .set({ 'X-User-Id': userId })
        .expect(lifetimeStats)
        .expect(200);
    });

    it('Should return 404 for missing params', async () => {
      await request(app)
        .get(`/courses/${uuid()}`)
        .set({ 'X-User-Id': userId })
        .expect(404);
      await request(app)
        .get(`/courses/${courseId}`)
        .set({ 'X-User-Id': uuid() })
        .expect(404);
    });

    it('Should reject requests missing X-User-Id', async () => {
      await request(app).get(`/courses/${courseId}`).expect(400);
    });

    describe('When GET /{courseId}/sessions/{sessionId}', () => {
      sessions.forEach((sessionId) => {
        it('Should return session data', async () => {
          await request(app)
            .get(`/courses/${courseId}/sessions/${sessionId}`)
            .set({ 'X-User-Id': userId })
            .expect(sessionData[sessionId])
            .expect(200);
        });

        it('Should reject requests missing X-User-Id', async () => {
          await request(app)
            .get(`/courses/${courseId}/sessions/${sessionId}`)
            .expect(400);
        });

        it('Should return 404 for missing params', async () => {
          await request(app)
            .get(`/courses/${uuid()}/sessions/${sessionId}`)
            .set({ 'X-User-Id': userId })
            .expect(404);
          await request(app)
            .get(`/courses/${courseId}/sessions/${uuid()}`)
            .set({ 'X-User-Id': userId })
            .expect(404);
          await request(app)
            .get(`/courses/${courseId}/sessions/${sessionId}`)
            .set({ 'X-User-Id': uuid() })
            .expect(404);
        });
      });
    });
  });
});
