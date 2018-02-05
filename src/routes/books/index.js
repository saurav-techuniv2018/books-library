const models = require('../../../models');

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
              reason: 'Unable to retrieve users.',
            },
            statusCode: 500,
          });
        });
    },
  },
];

