const { Stores, 
        Products, 
        User,  
        BiddingTransactions, 
        KeyTransactions, 
        ShippingDetails, 
        Uploads } = require('../../../models');

const { to, ReE, ReS } = require('../../../services/util.service');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const setAWinner = async function (req, res) {
        let err, store ;
        data =  req.body;
        [err, store] = await to(Stores.update(
                {
                        userWinner: data.userId,
                        setWinnerDate: new Date(),
                        setWinnerBy: req.user.dataValues.id
                },
                {
                        where: {
                                id: data.id,
                                userWinner: null
                        },
                        returning: true,
                        plain: true
                },
        ));
        if(err) return ReE(res, err, 422);

        return ReS(res, {message:'Successfully Set Winner', data:store}, 201);
}

module.exports.setAWinner = setAWinner;

const changeAWinner = async function (req, res) {
        let err, store ;
        data =  req.body;
        [err, store] = await to(Stores.update(
                {
                        userWinner: data.userId,
                        setWinnerDate: new Date(),
                        setWinnerBy: req.user.dataValues.id
                },
                {
                        where: {
                                id: data.id,
                                userWinner: {
                                        [Op.ne]: null
                                }
                        },
                        returning: true,
                        plain: true
                },
        ));
        if(err) return ReE(res, err, 422);

        return ReS(res, {message:'Successfully Set Winner', data:store}, 201);
}
module.exports.changeAWinner = changeAWinner;

