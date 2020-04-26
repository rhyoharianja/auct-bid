'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeyTransactions= sequelize.define('KeyTransactions', {
    keyId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    paymentMethod: DataTypes.INTEGER,
    paymentType: DataTypes.INTEGER,
    paymentStatus: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    paymentExpired: DataTypes.DATE,
  }, {});
  
  KeyTransactions.associate = function(models) {
    KeyTransactions.hasMany(models.KeyTransactionsLogs, { foreignKey: 'keyTransId' });
  };

  KeyTransactions.prototype.toWeb = function () {
    let json = this.toJSON();
    return json;
  };
  return KeyTransactions;
};