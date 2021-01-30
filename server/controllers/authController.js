const { models } = require('../models/sequelize');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { blacklistToken, checkInBlacklist } = require('../utills/authHelper.js');
const { isUserExist } = require('../utills/dbHelper');
const gmailSender = require('../utills/gmailSender');

const createAndSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 //90 DAYS
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user: user,
  });
};

exports.signup = async (req, res, next) => {
  try {
    let { email } = req.body;

    if (await isUserExist(email)) {
      res.status(409).json({ status: 'fail', message: 'User with current email already exist' });
      return;
    }

    const newUser = await createNewUser(req);

    if (!newUser) {
      res.status(400).json({ status: 'fail', message: 'Failed to create user' });
      return;
    }

    gmailSender.reconfigSender(email);
    createAndSendToken(newUser, 201, res);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ status: 'fail', message: 'Email and password are required' });
      return;
    }

    const user = await models.user.findOne({ where: { email: email } });
    if (!user) {
      res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
      return;
    }

    const isLoginCorrect = await bcrypt.compare(password, user.password);
    if (!isLoginCorrect) {
      res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
      return;
    }

    gmailSender.reconfigSender(email);
    createAndSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(401).json({ status: 'fail', message: 'You are not authorized' });
      return;
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check if user still exist
    const freshUser = await models.user.findByPk(decoded.id);
    if (!freshUser) {
      res.status(401).json({ status: 'fail', message: 'User not exist' });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
    return;
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    let token;

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(401).json({ status: 'fail', message: 'Not authorized' });
      return;
    }

    if (await checkInBlacklist(token)) {
      res.status(401).json({ status: 'fail', message: 'Authorization failed.Token corrupted!' });
      return;
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check if user still exist
    const freshUser = await models.user.findByPk(decoded.id);
    if (!freshUser) {
      res.status(401).json({ status: 'fail', message: 'Not authorized' });
      return;
    }

    gmailSender.reconfigSender(freshUser.email);

    res.status(200).json({
      status: 'success',
      user: freshUser,
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
    return;
  }
};

exports.logout = async (req, res, next) => {
  try {
    let token;

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(400).json({ status: 'fail', message: 'Logout is failed, no token received' });
      return;
    }

    if (await blacklistToken(token)) res.status(200).json({ status: 'succes', message: 'User logged out' });
    else res.status(400).json({ status: 'fail', message: 'Failed to logout' });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

const createNewUser = async (req) => {
  try {
    let { email, password, firstName, lastName } = req.body;
    const userId = uuid();
    const hash = await bcrypt.hash(password, 12);
    password = hash;

    const newUser = await models.user.create({ id: userId, email, password, firstName, lastName });

    if (newUser) {
      const tempCv = await newUser.createCv({
        name: 'cv-example',
        description: 'Example of CV document.',
        file: 'https://stas-docs.s3.eu-central-1.amazonaws.com/cv_template.pdf',
        type: 'pdf',
      });
      const tempCover = await newUser.createCover({
        name: 'cover-example',
        content:
          '{"blocks":[{"key":"flbnp","text":"Hello from CV Manager.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        direction: 'LTR',
      });
      const tempTemplate = await newUser.createTemplate({
        name: 'template-example',
        description: 'Example of template with cv and cover examples',
        cv: tempCv.id,
        cover: tempCover.id,
      });
      return newUser;
    }
    return null;
  } catch (err) {
    return null;
  }
};
