function applyExtraSetup(sequelize) {
  const { cv, cover, template } = sequelize.models;

  cv.hasMany(template);
  cover.hasMany(template);
}

module.exports = { applyExtraSetup };
