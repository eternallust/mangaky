'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    user_id: DataTypes.INTEGER,
    manga_id: DataTypes.INTEGER
  }, {});
  favorites.associate = function(models) {
    // associations can be defined here
    favorites.belongsTo(models.users,{
      as : 'users',
      foreignKey : 'user_id'
    }),
    favorites.belongsTo(models.mangas,{
      as: 'mangas',
      foreignKey : 'manga_id'
    })
  };
  return favorites;
};