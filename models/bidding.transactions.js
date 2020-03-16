'use strict';
module.exports = (sequelize, DataTypes) => {
  const bidding.transactions = sequelize.define('bidding.transactions', {
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    shippingType: DataTypes.INTEGER,
    shippingStatus: DataTypes.INTEGER
  }, {});
  bidding.transactions.associate = function(models) {
    // associations can be defined here
  };
  return bidding.transactions;
};