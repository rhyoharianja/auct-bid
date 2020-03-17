'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeyTransactions= sequelize.define('KeyTransactions', {
    keyId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE
  }, {});
  KeyTransactions.associate = function(models) {
    // associations can be defined here
  };
  return KeyTransactions;
};