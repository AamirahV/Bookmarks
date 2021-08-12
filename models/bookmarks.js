'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Comments = this.hasMany(models.Comments, { onDelete: 'cascade' })
      this.Tags = this.belongsToMany(models.Tags, { through: 'BookmarkTags' }, { onDelete: 'cascade' })
    }
  };
  Bookmarks.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bookmarks',
  });
  return Bookmarks;
};