const models = require('../../models');
const setLike = require('../../src/helpers/set-like');
const { addSampleEntries, removeAllEntries } = require('../setup');

beforeEach((done) => {
  removeAllEntries()
    .then(() => addSampleEntries())
    .then(() => { done(); });
});
afterEach((done) => {
  removeAllEntries()
    .then(() => { done(); });
});

describe('setLike', () => {
  test('should return a Promise', () => {
    expect(setLike(10, true)).toBeInstanceOf(Promise);
  });

  describe('should reject with error', () => {
    test('when bookId passed is not present in the database', (done) => {
      const id = -1;
      expect.assertions(1);

      setLike(id, false)
        .then(() => { })
        .catch((reason) => {
          expect(reason.message).toBe(`Could not find book with id: ${id}.`);
          done();
        });
    });
  });

  describe('should add or update row in the likes table', () => {
    test('when bookId is valid', (done) => {
      expect.assertions(1);
      const bookId = 10;
      const likeValue = true;
      setLike(bookId, likeValue)
        .then(() => models.sequelize.query(
          `select "bookId", "like" from likes where "bookId"=${bookId};`,
          { model: models.likes },
        ))
        .then((bookLikes) => {
          expect({
            bookId: bookLikes[0].bookId,
            like: bookLikes[0].like,
          })
            .toEqual({
              bookId,
              like: likeValue,
            });
          done();
        })
        .catch((e) => { throw e; });
    });
  });
});
