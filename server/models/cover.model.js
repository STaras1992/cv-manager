const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('cover', {
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
    content: {
      type: DataTypes.JSON,
    },
    direction: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['RTL', 'LTR']],
      },
    },
  });
};
