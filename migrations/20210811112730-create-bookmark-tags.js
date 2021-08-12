'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BookmarkTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookmarkId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Bookmarks'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        allowNull: false
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Tags'
          },
          key: 'id'
        },
        onDelete: 'cascade',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BookmarkTags');
  }
};