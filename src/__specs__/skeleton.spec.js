const request = require('supertest');
const nock = require('nock');
const app = require('..');

describe('Walking Skeleton', () => {
  describe('When the service is healthy', () => {
    beforeEach(() => {
      nock('http://google.com').get('/').reply(200);
    });

    it('Should return 200 OK and send an outgoing HTTP GET', async () => {
      await request(app).get('/ping').expect(200).expect('pong');
    });
  });
});
