'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chapters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      manga_id: {
        type: Sequelize.INTEGER,
        references:{
          model : 'mangas',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      chapter_name: {
        type: Sequelize.STRING
      },
      number_chapter: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chapters');
  }
};