const rp = require('request-promise');
const constants = require('../constants');

const joinBooksAndRatings = booksInput => new Promise((resolve, reject) => {
  const books = booksInput.map(book => ({
    bookId: book.id,
    author: book.Author,
    name: book.Name,
  }));

  const ratingsAPICallPromises = [];

  books.forEach((book) => {
    const ratingUrl = `${constants.api2}/${book.bookId}/`;
    const axiosGet = rp({
      method: 'GET',
      url: ratingUrl,
    });
    ratingsAPICallPromises.push(axiosGet);
  });

  Promise.all(ratingsAPICallPromises)
    .then((ratings) => {
      for (let i = 0; i < books.length; i += 1) {
        books[i].rating = JSON.parse(ratings[i]).rating;
      }
    })
    .then(() => {
      resolve(books);
    })
    .catch((reason) => {
      reject(new Error(reason.message));
    });
});

module.exports = joinBooksAndRatings;
