module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('books', 'like', Sequelize.BOOLEAN, {
      defaultValue: false,
    }),
  down: (queryInterface) => {
    queryInterface.removeColumn('books', 'like');
  },
};
