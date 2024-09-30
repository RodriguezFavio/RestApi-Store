const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/model/index');

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);

module.exports = sequelize;
