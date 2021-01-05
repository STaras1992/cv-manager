const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('template', {
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
  });
};
