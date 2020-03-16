'use strict';
module.exports = (sequelize, DataTypes) => {
  const bidding.transactions.log = sequelize.define('bidding.transactions.log', {
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    shippingType: DataTypes.INTEGER,
    shippingStatus: DataTypes.INTEGER
  }, {});
  bidding.transactions.log.associate = function(models) {
    // associations can be defined here
  };
  return bidding.transactions.log;
};