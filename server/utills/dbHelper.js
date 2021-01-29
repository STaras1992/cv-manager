const { models } = require('../models/sequelize');
const { Op } = require('sequelize');

/*Include id used for update instance.We can update instance with same name ,for this return false if same id*/
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

exports.isUserExist = async (email) => {
  const entry = await models.user.findOne({ where: { email: email } });
  if (entry) return true;
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
