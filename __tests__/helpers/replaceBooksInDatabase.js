const replaceBooksInDatabase = require('../../src/helpers/replaceBooksInDatabase');
const { addSampleEntries, removeAllEntries } = require('../setup');

beforeEach(() =>
  removeAllEntries()
    .then(() => addSampleEntries()));
afterEach(() =>
  removeAllEntries());

describe('replaceBooksInDatabase', () => {
  test('should return a promise', () => {
    expect(replaceBooksInDatabase([])).toBeInstanceOf(Promise);
  });

  describe('should remove all books in database', () => {
    test('when empty array of books is passed as input', (done) => {
      replaceBooksInDatabase([])
        .then((newBooks) => {
          expect(newBooks.length).toBe(0);
          done();
        });
    });
  });

  describe('should replace books in database with one book', () => {
    test('when empty array of books is passed as input', (done) => {
      replaceBooksInDatabase([{
        bookId: 1,
        name: 'Sample Book',
        author: 'XYZ',
        rating: 0.0,
      }])
        .then((newBooks) => {
          expect(newBooks.length).toBe(1);
          done();
        });
    });
  });
});

