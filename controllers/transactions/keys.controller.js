const { Keys } = require('../../models');
const { KeyTransactions } = require('../../models');
const { KeyTransactionsLogs } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');
const Sequelize = require('sequelize');

const keyList = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, keys;

    [err, keys] = await to(Keys.findAll());
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Keys List', data: keys}, 201);
}

module.exports.keyList = keyList;

const userKeyList = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, keys, user;
    user = req.user.dataValues;

    [err, keys] = await to(KeyTransactions.findAll({
            include: Keys,
            group: ['KeyTransactions.keyId'],
            attributes: ['keyId', [Sequelize.fn('COUNT', 'KeyTransactions.keyId'), 'count']],
        }, {
                where: { buyerId : user.id, useStatus: 0 },
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load User Keys List', data: keys}, 201);
}

module.exports.userKeyList = userKeyList;

const orderKey = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, kt;
    let user = req.user.dataValues;
    let expiredDate = new Date();
    expiredDate = expiredDate.setHours(expiredDate.getHours() + 2); 
    let okey = [];
    req.body.forEach(function(keys, index, arr) {
        for(a = 1 ; a <= keys.count; a++) {
                okey.push({
                        keyId: keys.keyId,
                        buyerId: user.id,
                        paymentMethod: 0,
                        paymentType: 0,
                        paymentStatus: 0,
                        paymentDate: null,
                        paymentExpired: expiredDate,
                        // KeyTransactionsLogs: {
                        //     keyId: keys.keyId,
                        //     buyerId: user.id,
                        //     paymentMethod: 0,
                        //     paymentType: 0,
                        //     paymentStatus: 0,
                        //     paymentDate: null,
                        //     paymentExpired: expiredDate,
                        // }
                });
        }
     });

    // [err, kt] = await to(KeyTransactions.bulkCreate(okey, {include : KeyTransactionsLogs}, {returning: true}));
    [err, kt] = await to(KeyTransactions.bulkCreate(okey));  

    if(err) return ReE(res, err, 422);
    
    return ReS(res,{message: 'Success Order Keys', data:kt}, 201);
}

module.exports.orderKey = orderKey;

const payKey = async function(req, res) {
    
}

module.exports.payKey = payKey;

const cancelOrder = async function(req, res) {
    
}

module.exports.cancelOrder = cancelOrder;
