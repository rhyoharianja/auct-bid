'use strict';
module.exports = (sequelize, DataTypes) => {
  const BiddingTransactions = sequelize.define('BiddingTransactions', {
    productId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    shippingType: DataTypes.INTEGER,
    shippingStatus: DataTypes.INTEGER,
    paymentExpired: DataTypes.DATE
  }, {});
  BiddingTransactions.associate = function(models) {
    BiddingTransactions.belongsTo(models.Stores, { foreignKey: 'storeId' });
  };
  BiddingTransactions.prototype.toWeb = function () {
    let json = this.toJSON();
    return json;
  };
  return BiddingTransactions;
};