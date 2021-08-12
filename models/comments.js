'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Bookmarks = this.belongsTo(models.Bookmarks)
    }
  };
  Comments.init({
    comment: DataTypes.STRING,
    bookmarkId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};