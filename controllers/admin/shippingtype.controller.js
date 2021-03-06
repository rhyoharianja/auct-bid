const { ShippingTypes } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, stype;

    let stype_data = req.body;
    
    [err, stype] = await to(ShippingTypes.create(stype_data));
    if(err) return ReE(res, err, 422);

    let stype_json = stype.toWeb();

    return ReS(res,{message: 'Success Add New Shipping Type', data:stype_json}, 201);
}

module.exports.create = create;

const update = async function(req, res){
    let err, stype, data;
    data = req.body;

    [err, stype] = await to(ShippingTypes.update(
        data,
        {where: {id: data.id} }
    ));
    if(err) return ReE(res, err, 422);

    [err, stype] = await to(ShippingTypes.findOne());

    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Update Detail Shipping Type', data:stype}, 201);
}
module.exports.update = update;

const remove = async function(req, res){
    let stype, err;

    [err, stype] = await to(ShippingTypes.destroy({
        where: {
          id: req.body.id
        }
    }));
    
    if(err) return ReE(res, err, 422);

    if(err) return ReE(res, 'error occured trying to delete the Shipping Type');

    return ReS(res, {message:'Successfully Delete Shipping Type', data:stype}, 201);
}
module.exports.remove = remove;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stypes;

    [err, stypes] = await to(ShippingTypes.findAll());
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Shipping Types List', data:stypes}, 201);
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');

    let err, stype;

    [err, stype] = await to(ShippingTypes.findOne({where: {id: req.params.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Detail Shipping Type', data:stype}, 201);
}
module.exports.get = get;