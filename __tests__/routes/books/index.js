const supertest = require('supertest');
const models = require('../../../models');
const server = require('../../../src/server');

describe('route /books', () => {
  describe('method GET /books', () => {
    test('should return a 200 OK statusCode', () =>
      supertest(server.listener)
        .get('/books')
        .then((response) => {
          expect(response.body.statusCode).toBe(200);
        })
        .catch(console.log));
  });
  test('should return all books', () =>
    supertest(server.listener)
      .get('/books')
      .then((response) => {
        expect(Object.keys(response.body.data).length).toBe(2);
      })
      .catch((e) => { throw e; }));
});

describe('method POST /books', () => {
  test('should return a 200 OK statusCode', (done) => {
    supertest(server.listener)
      .post('/books')
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      })
      .catch(console.log);
  });
  test('should add all books to database from external APIs', (done) => {
    supertest(server.listener)
      .post('/books')
      .then(() => models.books.count())
      .then((booksCount) => {
        expect(booksCount).toBe(12);
        done();
      })
      .catch(console.log);
  });
});
