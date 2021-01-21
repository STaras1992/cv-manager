const { models } = require('../models/sequelize');

exports.isCvExist = async (name) => {
  const entry = await models.cv.findOne({ where: { name: name } });
  return !!entry;
};

exports.isCoverExist = async (name) => {
  const entry = await models.cover.findOne({ where: { name: name } });
  return !!entry;
};

exports.isTemplateExist = async (name) => {
  const entry = await models.template.findOne({ where: { name: name } });

  return !!entry;
};
