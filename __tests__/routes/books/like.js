const supertest = require('supertest');
const models = require('../../../models');
const server = require('../../../src/server');

beforeEach(() => models.books.create({
  bookId: 1,
  name: 'Shall We Tell The President?',
  author: 'Jeffrey Archer',
  rating: 3.2,
}));
afterEach(() => models.books.destroy({ truncate: true }));
afterAll(() => models.close());

describe('route /books{bookId}/like', () => {
  describe('should set like to true', () => {
    test('when true is passed ', (done) => {
      models.books.findOne({
        where: {
          name: 'Shall We Tell The President?',
        },
      })
        .then(book => book.bookId)
        .then(id => supertest(server.listener).post(`/books/${id}/like`).send({ like: true }))
        .then(() => models.books.findOne({
          where: {
            name: 'Shall We Tell The President?',
          },
        }))
        .then((book) => {
          expect(book.like).toBe(true);
          done();
        });
    });
  });
});

