const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const xss = require('xss-clean');
const cron = require('node-cron');
const cvRouter = require('./routes/cvRouter.js');
const coverRouter = require('./routes/coverRouter.js');
const templateRouter = require('./routes/templateRouter.js');
const mailRouter = require('./routes/mailRouter.js');
const userRouter = require('./routes/userRouter.js');
const { refreshBlackList } = require('./utills/dbHelper.js');

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(morgan('dev'));
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  next();
});
app.use(fileupload());
// const { models } = require('./models/sequelize');

const limiter = rateLimit({
  max: 100,
  windowMs: 300000, //5min
  message: 'Too many requests from same IP.Try later',
});
app.use('/api', limiter);

app.use('/api/cv', cvRouter);
app.use('/api/cover', coverRouter);
app.use('/api/template', templateRouter);
app.use('/api/email', mailRouter);
app.use('/api/user', userRouter);

cron.schedule(
  '* * * * *',
  async () => {
    await refreshBlackList();
    console.log('Blacklist refreshed');
  },
  {
    scheduled: true,
    timezone: 'Asia/Jerusalem',
  }
);

module.exports = app;
