'use strict';
module.exports = (sequelize, DataTypes) => {
  const key.transactions.log = sequelize.define('key.transactions.log', {
    keyId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE
  }, {});
  key.transactions.log.associate = function(models) {
    // associations can be defined here
  };
  return key.transactions.log;
};