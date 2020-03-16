'use strict';
module.exports = (sequelize, DataTypes) => {
  const keys = sequelize.define('keys', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: DataTypes.SMALLINT
  }, {});
  keys.associate = function(models) {
    // associations can be defined here
  };
  return keys;
};