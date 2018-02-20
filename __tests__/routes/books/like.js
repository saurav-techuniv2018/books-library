const supertest = require('supertest');
const server = require('../../../src/server');
const { addSampleEntries, removeAllEntries } = require('../../setup');

beforeEach(() =>
  removeAllEntries()
    .then(() => addSampleEntries()));
afterEach(() =>
  removeAllEntries());

describe('route /books/{bookId}/like', () => {
  test('should return a 204 statusCode', done =>
    supertest(server.listener)
      .post('/books/10/like')
      .then((response) => {
        expect(response.body.statusCode).toBe(204);
        done();
      })
      .catch((reason) => { throw reason; }));
});
