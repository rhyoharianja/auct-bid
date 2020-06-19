const bcrypt         = require('bcrypt');
const bcrypt_p       = require('bcrypt-promise');
const { AccessToken } = require('../../models/accesstoken');
const { User } = require('../../models/users');
const { to, ReE, ReS } = require('../../services/util.service');

const requestReset = async function (req, res) {
    let err, data, errcheck, users;
    var today = new Date();

    [errcheck, users] = await to(User.findOne({
        where: {
          email: req.body.email
        }
      }));
    if(errcheck) return ReE(res, errcheck, 422);
    if(users == null ) return ReE(res, {message: 'No User Found With The Email Given'}, 422);

    let token = Math.floor(1000 + Math.random() * 9000);
    [err, data] = await to(AccessToken.create({
      refId: users.id,
      type: 'reset-password',
      token: token,
      url: '',
      status: 0,
      expired: today.setHours(today.getHours() + 4)
    }));
    if(err) return ReE(res, err, 422);

    let dataToken = data.toWeb();

    return ReS(res,{message: 'Success Add New Token', data:dataToken, user: users}, 201);
}
module.exports.requestReset = requestReset;

const getToken = async function (req, res) {
    let err, data;
    [err, data] = await to(AccessToken.findOne());
}
module.exports.getToken = getToken;

const changePassword = async function (req, res) {
    let err, data, errcheck, checktoken;
    let salt, hash;

    let userToken = req.body;

    [err, salt] = await to(bcrypt.genSalt(10));
    if(err) return ReE(res, err, 422);
    
    [err, hash] = await to(bcrypt.hash(userToken.password, salt));
    if(err) return ReE(res, err, 422);
    
    let newpassword = hash;

    [err, data] = await to(User.update({
      password: newpassword
    }, {
      where: {
        id: userToken.userId
      }
    }));

    if(err) return ReE(res, err, 422);

    [errcheck, checktoken] = await to(AccessToken.update(
      {
        status: 1
      }, 
      {
        where: {
          refId: userToken.userId,
          token: userToken.token
        }
      }
    ));

    if(errcheck) return ReE(res, errcheck, 422);

    return ReS(res,{message: 'Success Reset Password'}, 201);
}
module.exports.changePassword = changePassword;