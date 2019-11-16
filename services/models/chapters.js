'use strict';
module.exports = (sequelize, DataTypes) => {
  const chapters = sequelize.define('chapters', {
    manga_id: DataTypes.INTEGER,
    chapter_name: DataTypes.STRING,
    number_chapter: DataTypes.INTEGER
  }, {});
  chapters.associate = function(models) {
    // associations can be defined here
    chapters.belongsTo(models.mangas,{
      as : 'mangas',
      foreignKey : 'manga_id'
    })
  };
  return chapters;
};