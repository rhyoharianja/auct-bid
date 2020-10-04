'use strict';
module.exports = (sequelize, DataTypes) => {
  const ipaycards = sequelize.define('ipaycards', {
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    ipayicon: DataTypes.TEXT
  }, {});
  ipaycards.associate = function(models) {
    // associations can be defined here
  };
  return ipaycards;
};