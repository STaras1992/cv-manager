const { models } = require('../models/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

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
    if (newUser) {
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(201).json({
        status: 'success',
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          website: newUser.website,
        },
      });
    } else {
      res.status(500).json({ status: 'fail', message: 'Failed to create user' });
    }
  } catch (err) {
    res.status(409).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, body, next) => {
  const { email, password } = req.body;
};
