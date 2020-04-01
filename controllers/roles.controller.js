const { Roles } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, roles;

    let roles_data = req.body;
    
    [err, roles] = await to(Roles.create(roles_data));
    if(err) return ReE(res, err, 422);

    let roles_json = roles.toWeb();

    return ReS(res,{roles:roles_json}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, roles;

    [err, roles] = await to(Roles.getAll());

    let roles_json =[]
    for( let i in roles){
        let roles= roles[i];
        let role_data = roles.toWeb();
        roles_json.push(role_data);
    }

    return ReS(res, {roles:roles_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let roles = req.roles;

    return ReS(res, {roles:roles.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, roles, data;
    roles = req.roles;
    data = req.body;
    roles.set(data);

    [err, roles] = await to(roles.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {roles:roles.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let roles, err;
    roles = req.roles;

    [err, roles] = await to(roles.destroy());
    if(err) return ReE(res, 'error occured trying to delete the roles');

    return ReS(res, {message:'Deleted roles'}, 204);
}
module.exports.remove = remove;