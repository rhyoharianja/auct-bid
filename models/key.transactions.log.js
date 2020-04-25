'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeyTransactionsLog = sequelize.define('KeyTransactionsLog', {
    keyTransId: DataTypes.INTEGER,
    keyId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE
  }, {});
  KeyTransactionsLog.associate = function(models) {
    KeyTransactionsLog.belongsTo(models.KeyTransactions);
  };
  KeyTransactionsLog.prototype.toWeb = function () {
    let json = this.toJSON();
    return json;
  };
  return KeyTransactionsLog;
};