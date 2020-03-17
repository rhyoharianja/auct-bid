'use strict';
module.exports = (sequelize, DataTypes) => {
  const BiddingTransactionsLog = sequelize.define('BiddingTransactionsLog', {
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    shippingType: DataTypes.INTEGER,
    shippingStatus: DataTypes.INTEGER
  }, {});
  BiddingTransactionsLog.associate = function(models) {
    // associations can be defined here
  };
  return BiddingTransactionsLog;
};