const supertest = require('supertest');
const models = require('../../../models');
const server = require('../../../src/server');

beforeEach(() => models.books.create({
  bookId: 1,
  name: 'Shall We Tell The President?',
  author: 'Jeffrey Archer',
  rating: 3.2,
}));
afterEach(() =>
  models.likes.destroy({
    truncate: true,
    restartIdentity: true,
  })
    .then(() => models.books.destroy({
      truncate: true,
      restartIdentity: true,
    })));

describe('route /books/{bookId}/like', () => {
  test('should return a 204 statusCode', () =>
    supertest(server.listener)
      .post('/books/1/like')
      .then((response) => {
        expect(response.body.statusCode).toBe(204);
      })
      .catch((reason) => { throw reason; }));
  test('should set like to true', () =>
    supertest(server.listener)
      .post('/books/1/like')
      .then(() => models.likes.findOne({
        where: {
          bookId: 1,
        },
      }))
      .then((bookLike) => {
        expect(bookLike.like).toBe(true);
      })
      .catch((reason) => { throw reason; }));
});
