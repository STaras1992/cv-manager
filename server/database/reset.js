//const sequelize = require('../models/sequelize');

const reset = async (sequelize) => {
  try {
    const result = await sequelize.sync({ force: true });
    console.log('sync success');
  } catch (err) {
    console.log('sync error' + err.message);
  }
};

module.exports = reset;
