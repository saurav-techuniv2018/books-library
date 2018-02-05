const rp = require('request-promise');

const constants = require('../../constants');
const joinBooksAndRatings = require('../../helpers/joinBooksAndRatings');
const models = require('../../../models');
const replaceBooksInDatabase = require('../../helpers/replaceBooksInDatabase');
const like = require('./like');


module.exports = [
  {
    path: '/books',
    method: 'GET',
    handler: (request, response) => {
      models.books.findAll()
        .then(result => result.map(row => ({
          author: row.author,
          id: row.bookId,
          name: row.name,
          rating: row.rating,
        })))
        .then((books) => {
          const groupedBooks = books.reduce((group, book) => {
            const groupHolder = group;

            if (groupHolder[book.author] === undefined) {
              groupHolder[book.author] = [];
            }

            groupHolder[book.author].push(book);
            return groupHolder;
          }, {});

          return groupedBooks;
        })
        .then((groupedBooks) => {
          response({
            data: groupedBooks,
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve books.',
            },
            statusCode: 500,
          });
        });
    },
  },
  {
    path: '/books',
    method: 'POST',
    handler: (request, response) => {
      rp({
        method: 'GET',
        url: constants.api1,
      })
        .then((rpResponse) => {
          const p = rpResponse;
          return JSON.parse(rpResponse).books;
        })
        .then(books => joinBooksAndRatings(books))
        .then(newBooks => replaceBooksInDatabase(newBooks))
        .then((booksEntered) => {
          if (booksEntered) {
            response({
              data: booksEntered,
              statusCode: 200,
            });
          } else {
            throw new Error('Could not update books information');
          }
        })
        .catch((reason) => {
          response({
            data: {
              reason: reason.message,
            },
            statusCode: 500,
          });
        });
    },
  },
].concat(like);

