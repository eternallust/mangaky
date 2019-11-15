'use strict';
module.exports = (sequelize, DataTypes) => {
  const pages = sequelize.define('pages', {
    chapter_id: DataTypes.INTEGER,
    page: DataTypes.STRING,
    number_page: DataTypes.INTEGER
  }, {});
  pages.associate = function(models) {
    // associations can be defined here
    pages.belongsTo(models.chapters,{
      as : 'chapters',
      foreignKey : 'chapter_id'
    })
  };
  return pages;
};