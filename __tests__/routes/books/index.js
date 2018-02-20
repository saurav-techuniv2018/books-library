const supertest = require('supertest');
const server = require('../../../src/server');

describe('route /books', () => {
  describe('method GET /books', () => {
    test('should return a 200 OK statusCode', (done) => {
      expect.assertions(1);
      supertest(server.listener)
        .get('/books')
        .then((response) => {
          expect(response.body.statusCode).toBe(200);
          done();
        })
        .catch((e) => { throw e; });
    }, 10000);
  });

  describe('method POST /books', () => {
    test('should return a 200 OK statusCode', (done) => {
      supertest(server.listener)
        .post('/books')
        .then((response) => {
          expect(response.body.statusCode).toBe(200);
          done();
        })
        .catch((e) => { throw e; });
    }, 10000);
  });
});
