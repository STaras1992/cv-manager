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
    },
    description: {
      type: DataTypes.STRING,
    },
    cv: {
      type: DataTypes.INTEGER,
    },
    cover: {
      type: DataTypes.INTEGER,
    },
  });
};
