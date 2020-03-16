'use strict';
module.exports = (sequelize, DataTypes) => {
  const key.transactions = sequelize.define('key.transactions', {
    keyId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE
  }, {});
  key.transactions.associate = function(models) {
    // associations can be defined here
  };
  return key.transactions;
};