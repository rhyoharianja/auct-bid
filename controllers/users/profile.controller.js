const { User }          = require('../../models');
const authService       = require('../../services/auth.service');
const { to, ReE, ReS }  = require('../../services/util.service');

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');

    let err, currUser;
    currUser = req.user.dataValues;

    [err, users] = await to(User.findOne({
        where: {
          id: currUser.id
        }
      }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Detail Users', data:users}, 201);
}
module.exports.get = get;