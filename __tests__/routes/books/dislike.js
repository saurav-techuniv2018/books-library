const supertest = require('supertest');

const models = require('../../../models');
const server = require('../../../src/server');

beforeEach((done) => {
  models.books.create({
    bookId: 30,
    name: 'Shall We Tell The President?',
    author: 'Jeffrey Archer',
    rating: 3.2,
  })
    .then(() => done());
});
afterEach(() =>
  models.likes.destroy({
    truncate: true,
    restartIdentity: true,
  })
    .then(() => models.books.destroy({
      truncate: true,
      restartIdentity: true,
    })));

describe('route /books/{bookId}/dislike', () => {
  test('should return a 204 statusCode', (done) => {
    supertest(server.listener)
      .post('/books/30/dislike')
      .then((response) => {
        expect(response.body.statusCode).toBe(204);
        done();
      })
      .catch((reason) => { throw reason; });
  });
  test('should set like to false', (done) => {
    supertest(server.listener)
      .post('/books/30/dislike')
      .then(() => models.likes.findOne({
        where: {
          bookId: 30,
        },
      }))
      .then((bookLike) => {
        expect(bookLike.like).toBe(false);
        done();
      })
      .catch((reason) => { throw reason; });
  });
});

