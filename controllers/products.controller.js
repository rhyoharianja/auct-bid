const { Products } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, products;

    let products_data = req.body;
    
    [err, products] = await to(Products.create(products_data));
    if(err) return ReE(res, err, 422);

    let products_json = products.toWeb();

    return ReS(res,{products:products_json}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, products;

    [err, products] = await to(Products.getAll());

    let products_json =[]
    for( let i in products){
        let products= products[i];
        let role_data = Products.toWeb();
        products_json.push(role_data);
    }

    return ReS(res, {products:products_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let products = req.products;

    return ReS(res, {products:Products.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, products, data;
    products = req.products;
    data = req.body;
    products.set(data);

    [err, products] = await to(Products.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {products:Products.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let products, err;
    products = req.products;

    [err, products] = await to(Products.destroy());
    if(err) return ReE(res, 'error occured trying to delete the products');

    return ReS(res, {message:'Deleted products'}, 204);
}
module.exports.remove = remove;