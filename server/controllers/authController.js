const { models } = require('../models/sequelize');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

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

  //   if (process.env.NODE_ENV === 'production') {
  //     cookieOptions.secure = true;
  //   }

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
    let { email, password, firstName, lastName, website } = req.body;
    const userId = uuid();
    //Validation TODO
    const existUser = await models.user.findOne({ where: { email: email } });

    if (existUser) {
      res.status(409).json({ status: 'fail', message: 'User with current email already exist' });
      return;
    }

    const hash = await bcrypt.hash(password, 12);
    password = hash;

    const newUser = await models.user.create({ id: userId, email, password, firstName, lastName, website });

    if (!newUser) {
      res.status(500).json({ status: 'fail', message: 'Failed to create user' });
      return;
    }

    createAndSendToken(newUser, 201, res);
  } catch (err) {
    res.status(409).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
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

  createAndSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //   token = req.headers.authorization.split(' ')[1];
    // }
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(401).json({ status: 'fail', message: 'You are not authorized' });
      return;
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
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
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //   token = req.headers.authorization.split(' ')[1];
    // }

    if (!token) {
      res.status(400).json({ status: 'fail', message: 'Not authorized' });
      return;
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check if user still exist
    const freshUser = await models.user.findByPk(decoded.id);
    if (!freshUser) {
      res.status(400).json({ status: 'fail', message: 'Not authorized' });
      return;
    }

    res.status(200).json({
      status: 'success',
      user: freshUser,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
    return;
  }
};

exports.logout = async (req, res, next) => {
  //TODO logout with redis blacklist
  // res.status(200).json({
  //   status: 'success',
  //   user: freshUser,
  // });
};
