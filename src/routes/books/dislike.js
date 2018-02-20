const joi = require('joi');

const setLike = require('../../helpers/set-like');

module.exports = [
  {
    path: '/books/{bookId}/dislike',
    method: 'POST',
    config: {
      description: 'Set the like attribute for the specified book to false',
      tags: ['api'],
      validate: {
        params: {
          bookId: joi
            .number()
            .required()
            .description('bookId for the book to dislike'),
        },
      },
    },
    handler: (request, response) => {
      const id = Number(request.params.bookId);
      setLike(id, false)
        .then(() => response({
          statusCode: 204,
        }))
        .catch(reason => response({
          error: reason.message,
          statusCode: 500,
        }));
    },
  },
];
