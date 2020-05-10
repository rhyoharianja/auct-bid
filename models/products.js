'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('Products', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    images: DataTypes.STRING,
    status: DataTypes.SMALLINT
  });
  products.associate = function(models) {
    products.belongsTo(models.Categories, { foreignKey: 'categoryId' });
    products.hasMany(models.Uploads,{as: 'productImages'});
  };

  products.prototype.toWeb = function () {
    let json = this.toJSON();
    return json;
  };

  return products;
};