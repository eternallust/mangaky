'use strict';
module.exports = (sequelize, DataTypes) => {
  const mangas = sequelize.define('mangas', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    cover: DataTypes.STRING
  }, {});
  mangas.associate = function(models) {
    // associations can be defined here
    mangas.belongsTo(models.users,{
      as : 'users',
      foreignKey : 'user_id'
    })
  };
  return mangas;
};