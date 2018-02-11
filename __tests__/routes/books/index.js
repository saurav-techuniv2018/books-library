const supertest = require('supertest');
const models = require('../../../models');
const server = require('../../../src/server');

beforeEach(() => models.books.create({
  bookId: 1,
  name: 'Shall We Tell The President?',
  author: 'Jeffrey Archer',
  rating: 3.2,
}));
afterEach(() => models.books.destroy({
  truncate: true,
  restartIdentity: true,
})
  .then(() => models.likes.destroy({
    truncate: true,
    restartIdentity: true,
  })));

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
        expect(Object.keys(response.body.data).length).toBe(1);
      })
      .catch((e) => { throw e; }));
});
test('should return all books data', () =>
  supertest(server.listener)
    .get('/books')
    .then((response) => {
      expect(response.body.data['Jeffrey Archer']).toEqual([
        {
          author: 'Jeffrey Archer',
          id: 1,
          name: 'Shall We Tell The President?',
          rating: 3.2,
        },
      ]);
    })
    .catch(console.log));
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
