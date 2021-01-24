function applyExtraSetup(sequelize) {
  sequelize.models.user.hasMany(sequelize.models.cv, {
    foreignKey: 'userId',
    onDelete: 'cascade',
  });
  sequelize.models.cv.belongsTo(sequelize.models.user);

  sequelize.models.user.hasMany(sequelize.models.cover, {
    foreignKey: 'userId',
    onDelete: 'cascade',
  });
  sequelize.models.cover.belongsTo(sequelize.models.user);

  sequelize.models.user.hasMany(sequelize.models.template, {
    foreignKey: 'userId',
    onDelete: 'cascade',
  });
  sequelize.models.template.belongsTo(sequelize.models.user);

  // sequelize.models.cover.hasMany(sequelize.models.)
}

module.exports = { applyExtraSetup };
