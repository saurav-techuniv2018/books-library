module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    bookId: DataTypes.INTEGER,
    likes: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return likes;
};
