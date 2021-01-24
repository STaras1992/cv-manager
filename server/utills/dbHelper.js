const { models } = require('../models/sequelize');

exports.isCvExist = async (name, userId, includeId = -1) => {
  const entry = await models.cv.findOne({ where: { name: name, userId: userId } });
  return !!entry;
};

exports.isCoverExist = async (name, userId, includeId = -1) => {
  const entry = await models.cover.findOne({ where: { name: name, userId: userId } });
  return !!entry;
};

exports.isTemplateExist = async (name, userId, includeId = -1) => {
  const entry = await models.template.findOne({ where: { name: name, userId: userId } });
  if (entry && entry.id !== includeId) return true;
  return false;
};
