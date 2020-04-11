const { Keys } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, keys;

    let keys_data = req.body;
    
    [err, keys] = await to(Keys.create(roles_data));
    if(err) return ReE(res, err, 422);

    let keys_json = roles.toWeb();

    return ReS(res,{keys:keys_json}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, keys;

    [err, keys] = await to(Keys.getAll());

    let keys_json =[]
    for( let i in keys){
        let keys= keys[i];
        let keys_data = Keys.toWeb();
        roles_json.push(role_data);
    }

    return ReS(res, {keys:keys_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let roles = req.roles;

    return ReS(res, {keys:Keys.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, keys, data;
    keys = req.keys;
    data = req.body;
    keys.set(data);

    [err, keys] = await to(Keys.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {keys:Keys.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let keys, err;
    keys = req.roles;

    [err, keys] = await to(Keys.destroy());
    if(err) return ReE(res, 'error occured trying to delete the Keys');

    return ReS(res, {message:'Deleted Keys'}, 204);
}
module.exports.remove = remove;