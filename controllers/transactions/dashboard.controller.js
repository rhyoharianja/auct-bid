const { Stores } = require('../../models');
const { Products } = require('../../models');
const { User } = require('../../models');
const { BiddingTransactions } = require('../../models');
const { KeyTransactions } = require('../../models');
const { ShippingDetails } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const formatDates = function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month].join('-');
}
module.exports.formatDates = formatDates;

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
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

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
    let result = [];
    for (let im = 3; im >= 0; im--) {
        var dateA = new Date();
        var dateB = new Date(dateA.setMonth(dateA.getMonth() - im)).toISOString();
        var dateC = new Date()
        var mName = month[dateC.getMonth()-im];
        let dm = [];
        dm['monthNum'] = formatDates(dateB);
        dm['monthName'] = mName;
        dm['count'] = 0;
        if (stores !== undefined || stores.length != 0) {
            console.log(stores);
            for (let im2 = 0; im2 < stores.length; im2++) {
                console.log('numberNUm ==> ' +  stores[im2]['monthNum']);
                console.log('numberNUm ==> ' +  stores[im2].monthNum);
                if(stores[im2]['monthNum'] == dm['monthNum']) {
                    dm['count'] = store[im2]['count'];
                }
                
            }
        }
        result.push(dm);

    }

    console.log(result);

    return ReS(res, {message:'Successfully Load Room bidder Counter', data:result}, 201);
}
module.exports.countDataBidder = countDataBidder;

const userDataBidderWinner = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, stores;
    [err, stores] = await to(
        Stores.findAll(
            {
                attributes: [
                    [Sequelize.col('User.id'), 'user_id'],
                    [Sequelize.col('User.first'), 'user_first'],
                    [Sequelize.col('User.last'), 'user_last'],
                    [Sequelize.col('User.email'), 'user_email'],
                    [Sequelize.col('User.phone'), 'user_phone'],
                ],
                group: ['userWinner'],
                where: {
                    userWinner: {
                        [Op.or]: [
                            {
                                [Op.ne]: null
                            },
                            {
                                [Op.ne]: 0
                                
                            }
                        ]
                    }
                },
                order: [
                    ['id', 'DESC']
                ],
                limit: 5,
                include: [
                    {
                        model: User,
                        attributes: []
                    },
                ]
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Room bidder Winners', data:stores}, 201);
}

module.exports.userDataBidderWinner = userDataBidderWinner;

const userDataBidderList = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, stores;

    [err, stores] = await to(BiddingTransactions.findAll({
        attributes: [
            [Sequelize.col('User.id'), 'user_id'],
            [Sequelize.col('User.first'), 'user_first'],
            [Sequelize.col('User.last'), 'user_last'],
            [Sequelize.col('User.email'), 'user_email'],
            [Sequelize.col('User.phone'), 'user_phone'],
        ],
        group: ['buyerId'],
        include: [
            {
                model: User,
                attributes: []
            },
        ]
     }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load All bidders', data:stores}, 201);
}

module.exports.userDataBidderList = userDataBidderList;