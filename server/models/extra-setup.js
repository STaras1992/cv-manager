function applyExtraSetup(sequelize) {
  //const { user, cv, cover, template } = sequelize.models;
  // sequelize.models.user.hasMany(sequelize.models.cv);
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
  // cv.hasMany(template);
  // cover.hasMany(template);
}

module.exports = { applyExtraSetup };
