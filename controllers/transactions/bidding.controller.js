const { Stores } = require('../../models');
const { products } = require('../../models');
const { User } = require('../../models');
const { BiddingTransactions } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');

const { Op } = require('sequelize');

const storeList = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores;

    [err, stores] = await to(Stores.findAll({ 
        include: [ 
            { model: products}, 
            {
                model: BiddingTransactions,
                include: [
                    { model: User }
                ]
            }
        ]
     }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.storeList = storeList;

const storeListLive = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores;
    console.log(new Date());
    [err, stores] = await to(Stores.findAll(
            { 
                where: {
                    startBid: {
                        [Op.lte]: new Date()
                    },
                    endBid: {
                        [Op.gte]: new Date()
                    }

                },
                include: [ 
                    { model: products}, 
                    {
                        model: BiddingTransactions,
                        include: [
                            { model: User }
                        ]
                    }
                ]
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.storeListLive = storeListLive;

const storeListWaiting = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores;

    [err, stores] = await to(Stores.findAll(
            { 
                where: {
                    startBid: {
                        [Op.lte]: new Date()
                    },
                    endBid: {
                        [Op.gte]: new Date()
                    }

                },
                include: [products, BiddingTransactions]
            }, 
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.storeListWaiting = storeListWaiting;

const storeListUser = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores, user;
    user = req.user.dataValues;

    [err, stores] = await to(Stores.findAll(
            { include: [ 
                { model: products}, 
                {
                    model: BiddingTransactions,
                    where: { buyerId: user.id },
                    include: [
                        { model: User }
                    ]
                }
            ]
            }
        )
    );
    console.log(err);
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.storeListUser = storeListUser;

const storeListLiveUser = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores, user;
    user = req.user.dataValues;
    console.log(new Date());
    [err, stores] = await to(Stores.findAll(
            { 
                where: {
                    startBid: {
                        [Op.lte]: new Date()
                    },
                    endBid: {
                        [Op.gte]: new Date()
                    }

                },
                include: [ 
                    { model: products}, 
                    {
                        model: BiddingTransactions,
                        where: { buyerId: user.id },
                        include: [
                            { model: User }
                        ]
                    }
                ]
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.storeListLiveUser = storeListLiveUser;

const storeListWaitingUser = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores, user;
    user = req.user.dataValues;

    [err, stores] = await to(Stores.findAll(
            { 
                where: {
                    startBid: {
                        [Op.lte]: new Date()
                    },
                    endBid: {
                        [Op.gte]: new Date()
                    }

                },
                include: [ 
                    { model: products}, 
                    {
                        model: BiddingTransactions,
                        where: { buyerId: user.id },
                        include: [
                            { model: User }
                        ]
                    }
                ]
            }, 
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.storeListWaitingUser = storeListWaitingUser;

const userBidlist = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores, user;
    user = req.user.dataValues;

    [err, stores] = await to(BiddingTransactions.findAll(
            {
                where: {
                    buyerId: user.id
                },
                include: [
                    { 
                        model: Stores,
                        include: products
                    }]
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Current User Bids List', data:stores}, 201);
}
module.exports.userBidlist = userBidlist;

const orderBid = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, bids, bidData;
    let user = req.user.dataValues;

    bidData = {
        productId: req.body.productId,
        storeId: req.body.storeId,
        nominal: req.body.nominal,
        buyerId: user.id,
        paymentMethod: 0,
        paymentType: 0,
        paymentStatus: 0,
        paymentDate: null,
        shippingType: 0,
        shippingStatus: 0,
        paymentExpired: null
    };
    
    [err, bids] = await to(BiddingTransactions.create(bidData));
    console.log(err);
    if(err) return ReE(res, err, 422);

    return ReS(res,{message: 'Success Create Bidding', data:bids}, 201);

}

module.exports.orderBid = orderBid;

const updateOrderBid = async function(req, res){
    let err, bids, bidData;
    let user = req.user.dataValues;

    bidData = {
        productId: req.body.productId,
        storeId: req.body.storeId,
        nominal: req.body.nominal,
        buyerId: user.id,
        paymentMethod: 0,
        paymentType: 0,
        paymentStatus: 0,
        paymentDate: null,
        shippingType: 0,
        shippingStatus: 0,
        paymentExpired: null
    };
    
    [err, bids] = await to(BiddingTransactions.update(
        bidData,
        {where: {id: req.body.id} }
    ));

    if(err) return ReE(res, err, 422);

    [err, bids] = await to(BiddingTransactions.findOne({where: {id: req.body.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res,{message: 'Successfully Update Bid Price', data:bids}, 201);
}

module.exports.updateOrderBid = updateOrderBid;

