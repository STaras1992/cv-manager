const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const { clearBucket } = require('../utills/awsBucketHelper');
const cron = require('node-cron');

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
  dialect: 'mysql',
  host: process.env.SQL_HOST,
  logging: false,
  maxConcurrentQueries: 100,
  ssl: 'Amazon RDS',
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: 'en',
});

const resetDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('sync success');
    await clearBucket();
  } catch (err) {
    console.log('sync error:', err.message);
  }
};

const modelDefiners = [
  require('./cv.model'),
  require('./cover.model'),
  require('./template.model'),
  require('./user.model'),
  require('./token.model.js'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

//resetDb();

module.exports = sequelize;
