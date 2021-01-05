const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const xss = require('xss-clean');
const cvRouter = require('./routes/cvRouter.js');
const coverRouter = require('./routes/coverRouter.js');
const templateRouter = require('./routes/templateRouter.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  next();
});
const { models } = require('./models/sequelize');

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,try later',
});
app.use('/api', limiter);

app.use('/api/cv', cvRouter);
app.use('/api/cover', coverRouter);
app.use('/api/template', templateRouter);

module.exports = app;
