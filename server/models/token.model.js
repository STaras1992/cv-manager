const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('token', {
    jwt: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    expires: {
      type: DataTypes.INTEGER,
    },
  });
};
