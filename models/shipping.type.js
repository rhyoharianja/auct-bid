'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShippingTypes = sequelize.define('ShippingTypes', {
    shippingCode: DataTypes.CHAR,
    shippingName: DataTypes.STRING,
    shippingDescription: DataTypes.STRING,
    status: DataTypes.SMALLINT
  }, {});
  ShippingTypes.associate = function(models) {
    // associations can be defined here
  };
  return ShippingTypes;
};