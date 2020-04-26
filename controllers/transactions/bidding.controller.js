const { Stores } = require('../../models');
const { Stores } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');

const storeList = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores;

    [err, stores] = await to(Stores.findAll());
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Stores List', data:stores}, 201);
}
module.exports.storeList = storeList;

const userBidlist = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, stores, user;
    user = req.user.dataValues;

    [err, stores] = await to(BiddingTransactions.findAll({where: {buyerId: user.id} }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Current User Bids List', data:store}, 201);
}
module.exports.userBidlist = userBidlist;

const orderBid = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, bids;
    let user = req.user.dataValues;
    let expiredDate = new Date();
    expiredDate = expiredDate.setHours(expiredDate.getHours() + 2);

    let data = {
        productId:req.body.productId,
        buyerId: user.id,
        paymentMethod: 0,
        paymentType: 0,
        paymentStatus: 0,
        paymentDate: '',
        shippingType: 0,
        shippingStatus: 0
    }
    
    [err, bids] = await to(BiddingTransactions.create(data));
    if(err) return ReE(res, err, 422);

    let resp = bids.toWeb();
    return ReS(res,{message: 'Success Add New Category', data:resp}, 201);

}

module.exports.orderBid = orderBid;

