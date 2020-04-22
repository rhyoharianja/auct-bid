const { Keys } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');

const keyList = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, keys;

    [err, keys] = await to(Keys.findAll(
            {
                where: { status : 1 }
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Keys List', data: keys}, 201);
}

module.exports.keyList = keyList;

const userKeyList = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, keys;

    [err, keys] = await to(Keys.findAll(
            {
                where: { status : 1 }
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Keys List', data: keys}, 201);
}

module.exports.userKeyList = userKeyList;

const orderKey = async function(req, res) {
    
}

module.exports.orderKey = orderKey;

const payKey = async function(req, res) {
    
}

module.exports.payKey = payKey;

const cancelOrder = async function(req, res) {
    
}

module.exports.cancelOrder = cancelOrder;
