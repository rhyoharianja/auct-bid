const { User }          = require('../../models');
const authService       = require('../../services/auth.service');
const { to, ReE, ReS }  = require('../../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.unique_key && !body.email && !body.phone){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    // console.log("disini param" +req.params.user_id);
    res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
    let err, users;

    [err, users] = await to(User.findOne({
        where: {
          id: req.params.id
        }
      }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Detail Users', data:users}, 201);
}
module.exports.get = get;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, users;

    [err, users] = await to(User.findAll());
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Users List', data:users}, 201);
}
module.exports.getAll = getAll;

const update = async function(req, res){

    let err, user, data;
    data = req.body;

    [err, user] = await to(User.update(
        data,
        {where: {id: data.id} }
    ));
    if(err) return ReE(res, err, 422);

    [err, user] = await to(User.findOne({where: {id: data.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Update Detail Users', data:user}, 201);
}
module.exports.update = update;

const blockUser = async function(req, res){

    let err, user, data;
    data = req.body;

    [err, user] = await to(User.update(
        {status: 2},
        {where: {id: data.id} }
    ));
    if(err) return ReE(res, err, 422);

    [err, user] = await to(User.findOne({where: {id: data.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'The Select User Have Been Blocked', data:user}, 201);
}
module.exports.blockUser = blockUser;

const remove = async function(req, res){
    let user, err;

    [err, user] = await to(User.destroy({
        where: {
          id: req.params.id
        }
      }));
      if(err) return ReE(res, err, 422);

    if(err) return ReE(res, 'error occured trying to delete the User');

    return ReS(res, {message:'Successfully Delete User', data:user}, 201);
}
module.exports.remove = remove;

const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:user.getJWT(), user:user.toWeb()});
}
module.exports.login = login;