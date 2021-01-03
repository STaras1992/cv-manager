const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const sequelize = require('./models/sequelize');
const app = require('./App.js');

const PORT = process.env.PORT || 4000;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
  });
}

init();

// const server = app.listen(PORT, () => {
//   console.log('Server listening on port ' + PORT);
// });
