const { Stores } = require('../../models');
const { Products } = require('../../models');
const { User } = require('../../models');
const { BiddingTransactions } = require('../../models');
const { KeyTransactions } = require('../../models');
const { ShippingDetails } = require('../../models');
const { Uploads } = require('../../models');
const { StatusDesc } = require('../../models');
const { to, ReE, ReS } = require('../../services/util.service');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const ListRoomBidHasWinner = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, rooms;

    [err, rooms] = await to(Stores.findAll(
            {
                attributes: {
                    include: [
                        [Sequelize.col('Product.name'), 'product_name'],
                        [Sequelize.col('Product.price'), 'product_price'],
                        [Sequelize.col('winner.updatedAt'), 'last_update'],
                        [Sequelize.col('winner.payStatus.statusName'), 'payment_status'],
                        [Sequelize.col('winner.shipStatus.statusName'), 'last_status'],
                        [ Sequelize.literal('( SELECT IF (winner.shippingStatus != 0, winner.shippingStatus, winner.paymentStatus ) )'),'latest_status_code'],
                        [ Sequelize.literal('( SELECT IF (winner.shippingStatus != 0, last_status, payment_status ) )'),'latest_status_name']
                    ]
                },
                where: {
                    [Op.or]: [
                        {
                            userWinner: {
                                [Op.ne]: null
                            }
                        },
                        {
                            userWinner: {
                                [Op.ne]: 0
                            }
                        }
                    ]
                },
                include: [
                    {
                        model: BiddingTransactions,
                        as: 'winner',
                        on: {
                            '$Stores.userWinner$': { [Op.col]: 'winner.buyerId' },
                        },
                        include: [
                            {
                                model: User,
                                on: {
                                    '$Stores.userWinner$': { [Op.col]: 'winner.User.id' },
                                },
                            },
                            {
                                model: StatusDesc,
                                as: 'payStatus',
                                attributes: [],
                                on: {
                                    '$winner.paymentStatus$': { [Op.col]: 'winner.payStatus.statusCode' },
                                },
                            },
                            {
                                model: StatusDesc,
                                as: 'shipStatus',
                                attributes: [],
                                on: {
                                    '$winner.shippingStatus$': { [Op.col]: 'winner.shipStatus.statusCode' },
                                },
                            }
                        ]
                    },
                    {
                        model: Products,
                        attributes: []
                    },
                    {
                        model: BiddingTransactions,
                        as: 'listBidders',
                        include: [
                            {model: User}
                        ]
                    },
                ]
            }
        )
    );
    if(err) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Current User Bids List', data:rooms}, 201);
}

module.exports.ListRoomBidHasWinner = ListRoomBidHasWinner;