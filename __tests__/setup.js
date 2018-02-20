const models = require('../models');

const addSampleEntries = () =>
  models.books.bulkCreate([
    {
      author: 'ABC',
      name: 'XYZ',
      rating: 3.0,
      bookId: 10,
    },
    {
      author: 'ABC',
      name: 'XYZ',
      rating: 3.0,
      bookId: 11,
    },
  ])
    .then(() =>
      models.likes.bulkCreate([
        {
          bookId: 10,
          like: false,
        },
        {
          bookId: 11,
          like: false,
        },
      ]));

const removeAllEntries = () =>
  models.likes.destroy({
    truncate: true,
    restartIdentity: true,
  })
    .then(() =>
      models.books.destroy({
        truncate: true,
        restartIdentity: true,
      }));

module.exports = {
  addSampleEntries,
  removeAllEntries,
};
