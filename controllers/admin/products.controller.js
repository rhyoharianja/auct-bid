const { products } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, product;

    let product_data = req.body;
    
    [err, product] = await to(products.create(product_data));
    if(err) return ReE(res, err, 422);

    let product_json = product.toWeb();

    return ReS(res,{message: 'Success Add New Product', data:product_json}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, product;

    [err, product] = await to(products.findAll());
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Products List', data:product}, 201);
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');

    let err, product;

    [err, product] = await to(products.findOne({where: {id: req.params.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Detail Products', data:product}, 201);
}
module.exports.get = get;

const update = async function(req, res){
    let err, product, data;
    data = req.body;

    [err, product] = await to(products.update(
        data,
        {where: {id: data.id} }
    ));
    if(err) return ReE(res, err, 422);

    [err, product] = await to(products.findOne({where: {id: data.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Update Detail Product', data:product}, 201);
}
module.exports.update = update;

const remove = async function(req, res){
    let product, err;

    [err, product] = await to(products.destroy({
        where: {
          id: req.body.id
        }
      }));
      if(err) return ReE(res, err, 422);

    if(err) return ReE(res, 'error occured trying to delete the Products');

    return ReS(res, {message:'Successfully Delete Role', data:product}, 201);
}
module.exports.remove = remove;