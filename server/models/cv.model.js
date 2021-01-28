const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('cv', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1, 40],
      },
    },
    description: {
      type: DataTypes.STRING(512),
      validate: {
        len: [0, 150],
      },
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['pdf', 'doc', 'docx', 'txt']],
      },
    },
    file: {
      allowNull: false,
      type: DataTypes.STRING(512),
    },
  });
};
