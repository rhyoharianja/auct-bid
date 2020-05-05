const { Stores } = require('../../models');
const { products } = require('../../models');
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