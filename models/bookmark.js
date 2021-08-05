const bookmark = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define('bookmark', {
      name: {
        type: DataTypes.STRING(60)
      },
      url: {
        type: DataTypes.STRING(60)
      },
      description: {
        type: DataTypes.STRING(60)
      },
    }, {
      timestamps: false
    });

    return Bookmark;
  };

  module.exports = bookmark
