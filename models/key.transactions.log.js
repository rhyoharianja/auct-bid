'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeyTransactionsLog = sequelize.define('KeyTransactionsLog', {
    keyId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE
  }, {});
  KeyTransactionsLog.associate = function(models) {
    // associations can be defined here
  };
  return KeyTransactionsLog;
};