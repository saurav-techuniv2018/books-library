const models = require('../../models');

const replaceBooksInDatabase = books => new Promise((resolve, reject) => {
  models.likes.destroy({ truncate: true, restartIdentity: true })
    .then(() => models.books.destroy({ truncate: true, restartIdentity: true }))
    .then(() => {
      models.books.bulkCreate(books)
        .then((newBooks) => {
          const mappedBooks = newBooks.map(book => ({
            id: book.bookId,
            author: book.author,
            name: book.name,
            rating: book.rating,
          }));
          models.likes.bulkCreate(mappedBooks.map(book => ({
            bookId: book.id,
            like: false,
          })))
            .then(() => resolve(mappedBooks))
            .catch(() => {
              reject(new Error('Could not add books to database.'));
            });
        });
    });
});

module.exports = replaceBooksInDatabase;
