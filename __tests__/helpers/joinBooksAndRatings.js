const joinBooksAndRatings = require('../../src/helpers/joinBooksAndRatings');

describe('joinBooksAndRatings', () => {
  test('should return a promise', () => {
    expect(joinBooksAndRatings([])).toBeInstanceOf(Promise);
  });

  describe('should resolve to valid book objects', () => {
    test('when input is a valid array from external api1', (done) => {
      joinBooksAndRatings([
        {
          Author: 'J K Rowling',
          id: 2,
          Name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
        }])
        .then((books) => {
          expect(books).toEqual([{
            author: 'J K Rowling',
            bookId: 2,
            name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
            rating: 4.38,
          }]);
          done();
        });
    });
  });
});
