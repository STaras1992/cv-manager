const sequelize = require('../models/sequelize');

async function reset() {
  try {
    const result = await sequelize.sync({ force: true });
    console.log('sync:' + result);
  } catch (err) {
    console.log('sync:' + err);
  }
}

reset();
