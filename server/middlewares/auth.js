const { models } = require('../models/sequelize');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

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

    req.body.userId = decoded.id;
    next();
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
    return;
  }
};
