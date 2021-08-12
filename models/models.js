const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
    Bookmarks: require('./bookmarks')(sequelize, DataTypes),
    Comments: require('./comments')(sequelize, DataTypes),
    Tags: require('./tags')(sequelize, DataTypes)
};

module.exports = {
    sequelize: sequelize,
    models: models
}