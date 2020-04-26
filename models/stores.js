'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stores = sequelize.define('Stores', {
    productId: DataTypes.INTEGER,
    allowKey: DataTypes.STRING,
    startBid: DataTypes.DATE,
    endBid: DataTypes.DATE,
    userWinner: DataTypes.INTEGER,
    setWinnerDate: DataTypes.DATE,
    setWinnerBy: DataTypes.INTEGER,
    status: DataTypes.SMALLINT
  }, {});
  Stores.associate = function(models) {
    Stores.belongsTo(models.products, { foreignKey: 'productId' });
  };

  Stores.prototype.toWeb = function () {
    let json = this.toJSON();
    return json;
  };
  return Stores;
};