module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('books', 'bookId', Sequelize.INTEGER),

  down: (queryInterface) => {
    queryInterface.removeColumn('books', 'bookId');
  },
};
