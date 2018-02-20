const models = require('../../models');

const setLike = (bookId, likeValue) => new Promise((resolve, reject) => {
  models.books.findOne({
    where: {
      bookId,
    },
  })
    .then((book) => {
      if (book === null) {
        return reject(new Error(`Could not find book with id: ${bookId}.`));
      }

      return models.likes.update(
        { like: likeValue },
        { where: { bookId } },
      );
    })
    .then((bookLikesUpdated) => {
      const bookLike = bookLikesUpdated[0];
      return resolve({
        bookId: bookLike.bookId,
        like: bookLike.like,
      });
    })
    .catch(() => reject(new Error('Could not update book attributes.')));
});

module.exports = setLike;
