const { Keys, User } = require('../../models');
const { KeyTransactions, ShippingDetails, ShippingTypes } = require('../../models');
const { KeyTransactionsLogs } = require('../../models');
const iPayTotal = require('../../services/ipaytotal');
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
                where: { buyerId : user.id, useStatus : 0, paymentStatus: 12 }
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
                        paymentStatus: 10,
                        paymentDate: null,
                        paymentExpired: expiredDate
                });
        }
     });
    [err, kt] = await to(KeyTransactions.bulkCreate(okey));  

    if(err) return ReE(res, err, 422);
    
    return ReS(res,{message: 'Success Order Keys', data:kt}, 201);
}
module.exports.orderKey = orderKey;

const payKey = async function(req, res) {
    let err, ktf, ktu, user, erruser, datauser, errship, dataship, errpay, datapay, pstatus;

    user = req.user.dataValues;
    
    [erruser, datauser] = await to(User.findOne({where: {id: user.id} }));

    if(erruser) return ReE(res, erruser, 422);

    [errship, dataship] = await to(ShippingDetails.findOne({ 
        where: {
            userId: user.id
        },
        include: [
            {
                model: ShippingTypes
            }
        ],
        order: [[ 'createdAt', 'DESC' ]]
    }));

    if(errship) return ReE(res, errship, 422);

    console.log(dataship);

    let key = [];
    [err, ktf] = await to(KeyTransactions.findAll({
        where: {
          buyerId: user.id,
          paymentStatus: 10
        }
    }));

    if(err) return ReE(res, err, 422);

    console.log(ktf);
    
    let getPrice = 0;

    ktf.forEach(async function(getKey, index, arr){
        console.log(getKey);
        key.push(getKey.id);
        let getkeys;
        getkeys = Keys.findOne({where: {id: getKey.keyId} });
        getPrice += getkeys.price;
    })

    console.log(key);

    let refIdKey = key.join("-");

    console.log(refIdKey);
    console.log(getPrice);

    let paydata = {
        id: refIdKey,
        amount: getPrice,
        currency: req.body.currency,
        card_type: req.body.card_type,
        card_no: req.body.card_no,
        ccExpiryMonth: req.body.ccExpiryMonth,
        ccExpiryYear: req.body.ccExpiryYear,
        cvvNumber: req.body.cvvNumber,
        country: user.country,
        user: datauser,
        shipping: dataship
    };

    let keyVals = 'key';

    datapay = iPayTotal.makePayment(paydata, keyVals);

    console.log(datapay);

    if(datapay.status === 'fail') {
        return ReE(res, { message: datapay.message, data: datapay }, 201);
    } else if(datapay.status === 'failed'){
        pstatus = 15
    } else if(datapay.status === '3d_redirect') {
        pstatus = 14
    } else {
        pstatus = 12
    }

    [err, ktu] = await to(Sequelize.Promise.each(ktf, function(val, index) {
        
        return KeyTransactions.update({
            paymentMethod: 1,
            paymentType: req.body.card_type,
            payment_trxid: datapay.order_id,
            paymentStatus: pstatus,
            paymentDate: new Date(),
            ipayment_status: datapay.status,
            ipayment_desc: datapay.message
        },{
            where:{
                id: val.id,
                keyId: val.keyId
            },
            return: true
        });
    }));

    if(err) return ReE(res, err, 422);
    
    // [err, ktu] = await to(KeyTransactions.findAll({
    //     where: {
    //       id: key
    //     }
    // }));

    return ReS(res, {message:'Successfully Pay Current Key (s)', data:ktu}, 201);
}
module.exports.payKey = payKey;

const cancelOrder = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, kt;
    
    [err, kt] = await to(KeyTransactions.destroy({
        where: {
          id: req.body.id
        }
    }));

    if(err) return ReE(res, err, 422);

    return ReS(res,{message: 'Success Cancel Order Keys', data:kt}, 201);
    
}

module.exports.cancelOrder = cancelOrder;
