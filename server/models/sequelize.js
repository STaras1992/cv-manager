const { Sequelize } = require('sequelize');
const reset = require('../database/reset');
const { applyExtraSetup } = require('./extra-setup');

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
  dialect: 'mysql',
  host: process.env.SQL_HOST,
  logging: false,
  maxConcurrentQueries: 100,
  ssl: 'Amazon RDS',
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: 'en',
});

const modelDefiners = [require('./cv.model'), require('./cover.model'), require('./template.model')];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

//reset(sequelize);

applyExtraSetup(sequelize);

module.exports = sequelize;
