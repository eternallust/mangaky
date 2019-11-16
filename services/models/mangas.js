'use strict';
module.exports = (sequelize, DataTypes) => {
  const mangas = sequelize.define('mangas', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    cover: DataTypes.STRING,
    genre: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    status: DataTypes.INTEGER,
  }, {});
  mangas.associate = function(models) {
    // associations can be defined here
    mangas.belongsTo(models.users,{
      as : 'user',
      foreignKey : 'user_id'
    })
  };
  return mangas;
};