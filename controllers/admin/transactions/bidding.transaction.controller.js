const { Stores, 
    Products, 
    User,  
    BiddingTransactions, 
    KeyTransactions, 
    ShippingDetails, 
    Uploads } = require('../../../models');

const { to, ReE, ReS } = require('../../services/util.service');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const listNeedPaymentConfirmed = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, stores;

    [err, stores] = await to(Stores.findAll({ 
        include: [ 
            { 
                model: Products,
                include: [
                    {
                        model: Uploads,
                        as: 'productImages',
                        attributes: [['content', 'productName'], ['contentId', 'productId']],
                        on: {
                            '$Product.name$': { [Op.col]: 'content' },
                            '$Product.id$': { [Op.col]: 'contentId' },
                        }
                    }
                ]
            }, 
            {
                model: BiddingTransactions,
                on: {
                    '$BiddingTransactions.biddingStatus$': { [Op.lte]: 1 },
                    '$BiddingTransactions.paymentStatus$': 12,
                },
                include: [
                    { model: User }
                ]
            }
        ]
     }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.listNeedPaymentConfirmed = listNeedPaymentConfirmed;

const confirmAdminBidding = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let errSel, upBidTrans, errList, listStatus, data;
    data = req.body;
    [errSel, upBidTrans] = await to(BiddingTransactions.findOne(
        {
            where: {
                id: data.id
            }
        }
    ));
    if(errSel) return ReE(res, errSel, 422);
    [errList, listStatus] = await to(StatusDesc.findAll(
        {
            where: {
                statusCode: {
                    [Op.gte]: upBidTrans.paymentStatus
                }
            }
        }
    ));
    if(errList) return ReE(res, errList, 422);
    return ReS(res, {message:'Successfully Load Stores List', data:upBidTrans, list: listStatus}, 201);

}
module.exports.confirmAdminBidding = confirmAdminBidding;

const updateStatusBiddingAdmin = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, bids, errstat, statBid, data;

    [errstat, statBid] = await to(StatusDesc.findOne({where: {statusCode: req.body.status} }));

    if(errstat) return ReE(res, errstat, 422);
    if(statBid.statusType == 'payment') {
        data = {
            paymentStatus: req.body.status
        };
    } else {
        data = {
            shippingStatus: req.body.status
        };
    }
    [err, bids] = await to(BiddingTransactions.update(
        data,
        {where: {id: req.body.id} }
    ));
    if(err) return ReE(res, err, 422);
    return ReS(res,{message: 'Successfully Update Bid Status Transaction', data:bids}, 201);
}
module.exports.updateStatusBiddingAdmin = updateStatusBiddingAdmin;