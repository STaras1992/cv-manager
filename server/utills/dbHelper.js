const { models } = require('../models/sequelize');

exports.isCvExist = async (name, userId) => {
  const entry = await models.cv.findOne({ where: { name: name, userId: userId } });
  return !!entry;
};

exports.isCoverExist = async (name, userId) => {
  const entry = await models.cover.findOne({ where: { name: name, userId: userId } });
  return !!entry;
};

exports.isTemplateExist = async (name, userId) => {
  const entry = await models.template.findOne({ where: { name: name, userId: userId } });

  return !!entry;
};
