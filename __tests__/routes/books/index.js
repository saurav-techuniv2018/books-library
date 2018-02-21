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

describe('method GET /books/likes', () => {
  test('should return a statusCode of 200', (done) => {
    supertest(server.listener)
      .get('/books/likes')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('should return array in data property of payload', (done) => {
    supertest(server.listener)
      .get('/books/likes')
      .then((response) => {
        expect(Array.isArray(response.body.data)).toBe(true);
        done();
      });
  });

  test('should return array of objects in data property of payload', (done) => {
    supertest(server.listener)
      .get('/books/likes')
      .then((response) => {
        if (response.body.data.length > 0) {
          expect(response.body.data[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            author: expect.any(String),
            name: expect.any(String),
            rating: expect.any(Number),
            like: expect.any(Boolean),
          }));
          done();
        }
      });
  });
});
