const { ExtractJwt, Strategy } = require('passport-jwt');
const { User }      = require('../models');
const CONFIG        = require('../config/config');
const {to}          = require('../services/util.service');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log(opts.jwtFromRequest);
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        let err, user;
        console.log(jwt_payload);
        [err, user] = await to(User.findByPk(jwt_payload.user_id));
        console.log(jwt_payload);
        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
}