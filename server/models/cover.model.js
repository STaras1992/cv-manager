const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('cover', {
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
    text: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      },
    },
  });
};
