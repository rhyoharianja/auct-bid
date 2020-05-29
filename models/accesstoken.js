'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    type: DataTypes.STRING,
    url: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    expired: DataTypes.DATE
  }, {});
  AccessToken.associate = function(models) {
    // associations can be defined here
  };
  return AccessToken;
};