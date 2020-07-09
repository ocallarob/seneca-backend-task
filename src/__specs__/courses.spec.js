const request = require('supertest');
const {
  random: { uuid, number },
} = require('faker');

const app = require('..');

describe('/courses', () => {
  describe('When POST /{courseId}', () => {
    const courseId = uuid();
    const userId = uuid();
    const courseStatsDiff = {
      totalModulesStudied: number(),
      averageScore: number(100), // Assume scores in %
      timeStudied: number(),
    };
    const sessions = [uuid(), uuid(), uuid()];

    sessions.forEach((sessionId, index) => {
      const stats = { ...courseStatsDiff, sessionId };
      it('Should return 201 OK and course lifetime stats Object', async () => {
        await request(app)
          .post(`/courses/${courseId}`)
          .set({ 'X-User-Id': userId })
          .send(stats)
          .expect(201);
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
});
