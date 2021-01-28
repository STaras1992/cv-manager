const { models } = require('../models/sequelize');
const { Op } = require('sequelize');

exports.isCvExist = async (name, userId, includeId = -1) => {
  const entry = await models.cv.findOne({ where: { name: name, userId: userId } });
  if (entry && entry.id !== includeId) return true;
  return false;
};

exports.isCoverExist = async (name, userId, includeId = -1) => {
  const entry = await models.cover.findOne({ where: { name: name, userId: userId } });
  if (entry && entry.id !== includeId) return true;
  return false;
};

exports.isTemplateExist = async (name, userId, includeId = -1) => {
  const entry = await models.template.findOne({ where: { name: name, userId: userId } });
  if (entry && entry.id !== includeId) return true;
  return false;
};

exports.refreshBlackList = async () => {
  try {
    const tokensToRemove = await models.token.findAll({ where: { expires: { [Op.lte]: Date.now() } } }, { raw: true });
    if (tokensToRemove) {
      tokensToRemove.forEach(async (token) => {
        await models.token.destroy({ where: { jwt: token.jwt } });
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
