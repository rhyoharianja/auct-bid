'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    images: DataTypes.STRING,
    status: DataTypes.SMALLINT
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };

  products.prototype.toWeb = function () {
    let json = this.toJSON();
    return json;
  };

  return products;
};