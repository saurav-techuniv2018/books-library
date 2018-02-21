const rp = require('request-promise');

const constants = require('../../constants');
const joinBooksAndRatings = require('../../helpers/joinBooksAndRatings');
const replaceBooksInDatabase = require('../../helpers/replaceBooksInDatabase');
const like = require('./like');
const dislike = require('./dislike');
const models = require('../../../models');

module.exports = [
  {
    path: '/books',
    method: 'GET',
    config: {
      description: 'Get all the books from External API, combined with ratings, grouped by authors and sorted in descending order by rating',
      tags: ['api'],
    },
    handler: (request, response) => {
      rp({
        method: 'GET',
        url: constants.api1,
      })
        .then(rpResponse => JSON.parse(rpResponse).books)
        .then(books => joinBooksAndRatings(books))
        .then((books) => {
          const groupedBooks = books.reduce((group, book) => {
            const groupHolder = group;

            if (groupHolder[book.author] === undefined) {
              groupHolder[book.author] = [];
            }

            groupHolder[book.author].push(book);
            return groupHolder;
          }, {});

          Object.keys(groupedBooks).forEach((key) => {
            const booksInThisGroup = groupedBooks[key];
            groupedBooks[key] = booksInThisGroup.sort((a, b) => a.rating >= b.rating);
          });

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
    config: {
      description: 'Update database with books from the external API',
      tags: ['api'],
    },
    handler: (request, response) => {
      rp({
        method: 'GET',
        url: constants.api1,
      })
        .then(rpResponse => JSON.parse(rpResponse).books)
        .then(books => joinBooksAndRatings(books))
        .then(newBooks => replaceBooksInDatabase(newBooks))
        .then((booksEntered) => {
          if (booksEntered) {
            response({
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
  {
    path: '/books/likes',
    method: 'GET',
    config: {
      description: 'Retrieve book details with the like attribute.',
      tags: ['api'],
    },
    handler: (request, response) => {
      const allBooksPromise = models.books.findAll();
      const allLikesPromise = models.likes.findAll();

      Promise.all([allBooksPromise, allLikesPromise])
        .then(([books, likes]) => {
          const sortByBookId = (row1, row2) => row1.bookId > row2.bookId;

          const booksSortedByBookId = books.sort(sortByBookId);
          const likesSortedByBookId = likes.sort(sortByBookId);

          const booksAndLikesCombined = [];
          booksSortedByBookId.forEach((book, index) => {
            booksAndLikesCombined.push({
              id: book.bookId,
              name: book.name,
              author: book.author,
              rating: book.rating,
              like: likesSortedByBookId[index].like,
            });
          });

          response({
            statusCode: 200,
            data: booksAndLikesCombined,
          });
        })
        .catch(() => {
          response({
            statusCode: 500,
            error: 'Could not retrieve book details.',
          });
        });
    },
  },
].concat(like, dislike);

