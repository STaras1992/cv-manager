function applyExtraSetup(sequelize) {
  sequelize.models.user.hasMany(sequelize.models.cv, {
    foreignKey: 'userId',
    onDelete: 'cascade',
  });

  sequelize.models.user.hasMany(sequelize.models.cover, {
    foreignKey: 'userId',
    onDelete: 'cascade',
  });

  sequelize.models.user.hasMany(sequelize.models.template, {
    foreignKey: 'userId',
    onDelete: 'cascade',
  });

  sequelize.models.cv.hasMany(sequelize.models.template, {
    foreignKey: 'cv',
    onDelete: 'cascade',
  });

  sequelize.models.cover.hasMany(sequelize.models.template, {
    foreignKey: 'cover',
    onDelete: 'cascade',
  });
}

module.exports = { applyExtraSetup };
