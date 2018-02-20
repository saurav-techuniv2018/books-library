const supertest = require('supertest');

const server = require('../../../src/server');
const { addSampleEntries, removeAllEntries } = require('../../setup');

beforeEach(() =>
  removeAllEntries()
    .then(() => addSampleEntries()));
afterEach(() =>
  removeAllEntries());

describe('route /books/{bookId}/dislike', () => {
  test('should return a 204 statusCode', (done) => {
    const bookId = 10;
    supertest(server.listener)
      .post(`/books/${bookId}/dislike`)
      .then((response) => {
        expect(response.body.statusCode).toBe(204);
        done();
      })
      .catch((reason) => { throw reason; });
  });
});

