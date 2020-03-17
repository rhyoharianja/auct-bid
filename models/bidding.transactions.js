'use strict';
module.exports = (sequelize, DataTypes) => {
  const BiddingTransactions = sequelize.define('BiddingTransactions', {
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    shippingType: DataTypes.INTEGER,
    shippingStatus: DataTypes.INTEGER
  }, {});
  BiddingTransactions.associate = function(models) {
    // associations can be defined here
  };
  return BiddingTransactions;
};