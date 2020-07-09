const request = require('supertest');
const {
  random: { uuid, number },
} = require('faker');

const app = require('..');

describe('/courses', () => {
  describe('When POST /{courseId}', () => {
    let courseId;
    let userId;
    let courseStatsDiff;

    beforeEach(() => {
      courseId = uuid();
      userId = uuid();
      courseStatsDiff = {
        totalModulesStudied: number(),
        averageScore: number(100), // Assume scores in %
        timeStudied: number(),
      };
    });

    const sessions = [uuid(), uuid(), uuid()];

    sessions.forEach((sessionId) => {
      const stats = { ...courseStatsDiff, sessionId };
      it('Should return 201 OK and course lifetime stats Object', async () => {
        await request(app)
          .post(`/courses/${courseId}`)
          .set({ 'X-User-Id': userId })
          .send(stats)
          .expect(201);
      });
    });
  });
});
