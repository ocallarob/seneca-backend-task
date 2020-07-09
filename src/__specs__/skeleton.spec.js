const request = require('supertest');
const app = require('..');

describe('Walking Skeleton', () => {
  describe('When GET /ping', () => {
    it('Should return 200 OK and a String', async () => {
      await request(app).get('/ping').expect(200).expect('pong');
    });
  });
});
