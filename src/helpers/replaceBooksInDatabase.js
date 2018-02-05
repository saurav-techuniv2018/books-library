const models = require('../../models');

const replaceBooksInDatabase = books => new Promise((resolve, reject) => {
  models.books.destroy({ truncate: true })
    .then(() => models.books.bulkCreate(books))
    .then(newBooks => newBooks.map(book => ({
      id: book.bookId,
      author: book.author,
      name: book.name,
      rating: book.rating,
    })))
    .then((newBooks) => {
      resolve(newBooks);
    })
    .catch(() => {
      reject(new Error('Could not add books to database.'));
    });
});

module.exports = replaceBooksInDatabase;
