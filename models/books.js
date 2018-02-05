module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    bookId: DataTypes.INTEGER,
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    rating: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return books;
};
