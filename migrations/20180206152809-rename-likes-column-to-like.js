

module.exports = {
  up: queryInterface => queryInterface.renameColumn('likes', 'likes', 'like'),
  down: queryInterface => queryInterface.renameColumn('likes', 'like', 'likes'),

};
