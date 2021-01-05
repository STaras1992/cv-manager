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
        len: [1, 30],
      },
    },
    title: {
      // allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 30],
      },
    },
    type: {
      // allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['pdf', 'doc', 'docx']],
      },
    },
  });
};
