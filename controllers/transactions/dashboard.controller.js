const { Stores } = require('../../models');
const { Products } = require('../../models');
const { User } = require('../../models');
const { BiddingTransactions } = require('../../models');
const { KeyTransactions } = require('../../models');
const { ShippingDetails } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const countData = async function (req, res) {
    const { count, rows } = await Stores.findAndCountAll();

    const { countwinner, rowswinner } = await Stores.findAndCountAll({
        group: ['userWinner'],
        where: {
            userWinner: {
                $not: null
            }
        }
    });
    const { countUser, rowsUser } = await User.findAndCountAll();
    let alldata = {
        room : (count) ? count : 0,
        winner: (countwinner) ? countwinner : 0,
        user: (countUser) ? countUser : 0
    }

    return ReS(res, {message:'Successfully Load Stores List', data : alldata}, 201);
}
module.exports.countData = countData;

const countDataBidder = async function (req, res) {
    var currDate = new Date();
    res.setHeader('Content-Type', 'application/json');
    let err, stores;

    [err, stores] = await to(BiddingTransactions.findAll({
        attributes: [
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'monthNum'],
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%M'), 'monthName'],
            [Sequelize.fn('count','*'),'count']
        ],
        group: ['monthNum'],
        where: {
            createdAt: {
                [Op.gte]: new Date(currDate.setMonth(currDate.getMonth()-3)).toISOString(),
                [Op.lte]: new Date().toISOString()
            }
        },
     }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Room bidder Counter', data:stores}, 201);
}
module.exports.countDataBidder = countDataBidder;
