const { Stores } = require('../../models');
const { products } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, store;

    let store_data = req.body;
    
    [err, store] = await to(Stores.create(store_data));
    if(err) return ReE(res, err, 422);

    let store_json = store.toWeb();

    return ReS(res,{message: 'Success Add New stores', data:store_json}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores;

    [err, stores] = await to(Stores.findAll());
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.getAll = getAll;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');

    let err, store;

    [err, store] = await to(Stores.findOne({where: {id: req.params.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Detail Stores', data:store}, 201);
}
module.exports.get = get;

const update = async function(req, res){
    let err, store, data;
    data = req.body;

    [err, store] = await to(Stores.update(
        data,
        {where: {id: data.id} }
    ));
    if(err) return ReE(res, err, 422);

    [err, stores] = await to(Stores.findOne({
        where: {
          id: req.body.id
        }
      }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Update Detail stores', data:store}, 201);
}
module.exports.update = update;

const remove = async function(req, res){
    let store, err;

    [err, store] = await to(stores.destroy({
        where: {
          id: req.body.id
        }
      }));
      if(err) return ReE(res, err, 422);

    if(err) return ReE(res, 'error occured trying to delete the Stores');

    return ReS(res, {message:'Successfully Delete Role', data:store}, 201);
}
module.exports.remove = remove;