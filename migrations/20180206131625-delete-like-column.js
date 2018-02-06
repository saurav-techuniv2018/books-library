module.exports = {
  up: queryInterface => queryInterface.removeColumn('books', 'like'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('books', 'like', Sequelize.INTEGER),
};
