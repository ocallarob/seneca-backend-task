const request = require('supertest');
const nock = require('nock');
const app = require('..');

describe('Walking Skeleton', () => {
  describe('When GET /ping', () => {
    beforeEach(() => {
      nock('http://google.com').get('/').reply(200);
    });

    it('Should return 200 OK and a String', async () => {
      await request(app).get('/ping').expect(200).expect('pong');
    });
  });
});
