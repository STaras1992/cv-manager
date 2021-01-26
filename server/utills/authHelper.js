const { models } = require('../models/sequelize');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.blacklistToken = async (token) => {
  const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const result = await models.token.create({ jwt: token, expires: decodedToken.exp });

  return !!result;
};

exports.checkInBlacklist = async (token) => {
  const result = await models.token.findByPk(token);
  console.log(result);
  return !!result;
};
