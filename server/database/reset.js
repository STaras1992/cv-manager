const { clearBucket } = require('../utills/awsBucketHelper');

const reset = async (sequelize) => {
  try {
    const result = await sequelize.sync({ force: true });
    console.log('sync success');
    await clearBucket();
  } catch (err) {
    console.log('sync error' + err.message);
  }
};

module.exports = reset;
