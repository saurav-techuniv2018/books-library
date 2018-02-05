const models = require('../../../models');

module.exports = [
  {
    path: '/books/{bookId}/like',
    method: 'POST',
    handler: (request, response) => {
      const id = request.params.bookId;

      models.books.findOne({
        where: {
          bookId: id,
        },
      })
        .then((book) => {
          if (book === null) {
            throw new Error(`Could not find book with id: ${id}.`);
          }

          return book.updateAttributes({
            like: request.payload.like,
          });
        })
        .then(() => {
          response({
            statusCode: 204,
          });
        }, (reason) => {
          response({
            data: { reason: reason.message },
            statusCode: 404,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Could not update book attributes.',
            },
            statusCode: 500,
          });
        });
    },
  },
];
