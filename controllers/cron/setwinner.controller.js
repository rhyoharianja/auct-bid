const { Stores, 
    Products, 
    User,  
    BiddingTransactions, 
    KeyTransactions, 
    ShippingDetails, 
    Uploads } = require('../../models');

const { to, ReE, ReS } = require('../../services/util.service');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const autoSetWinner = async function (req, res) {
    let err, stores;

    [err, stores] = await to(Stores.findAll(
        { 
            where: {
                [Op.or]: [
                    {
                        startBid: {
                            [Op.lt]: new Date()
                        },
                        endBid: {
                            [Op.lt]: new Date()
                        }
                    }, 
                    {
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
                    }
                    
                ]
            }
        }
    ));
    if(err) return ReE(res, err, 422);
    if(stores == null) return ReE(res, {message: 'No User Found With The Email Given'}, 422); 
    
    stores.forEach( async function(store, index, arr){
        let errbidwinner, getbidwinner;
        [errbidwinner, getbidwinner] = await to(BiddingTransactions.findOne({
            where: {
                storeId: store.id,
                biddingStatus: 1
            },
            order: [
                ['nominal', 'DESC']
            ],
            limit: 1,
        }));
        if(getbidwinner != null) {
            let errupdate, getupdate;
            [errupdate, getupdate] = await to(Stores.update(
                {
                    userWinner: getbidwinner.buyerId,
                    setWinnerDate: new Date()
                },
                {
                    where: {
                        id: store.id
                    }
                }
            ))
        }
    });
    return ReS(res, {message:'Successfully Load Stores List End', data:stores}, 201);
}

module.exports.autoSetWinner = autoSetWinner;