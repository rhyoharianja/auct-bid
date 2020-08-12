const { Stores, 
    Products, 
    User,  
    BiddingTransactions, 
    KeyTransactions, 
    ShippingDetails, 
    Uploads } = require('../../models');

const  fcmService = require('../../services/fcm.notification.services'); 
const { to, ReE, ReS } = require('../../services/util.service');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const newproductAdd = async function (req, res) {
    let err, stores;
    var currDate = new Date();
    [err, stores] = await to(Stores.findAll(
        { 
            where: {
                [Op.and]: [
                    {
                        startBid: {
                            [Op.gte]: new Date()
                        },
                        endBid: {
                            [Op.gte]: new Date()
                        }
                    }, 
                    {
                        createdAt : {
                            [Op.gte]: new Date()
                        },
                        createdAt : {
                            [Op.lte]: new Date(currDate.setHours(currDate.getHours() + 1))
                        }
                    }
                ]
            }
        }
    ));
    if(err) return ReE(res, err, 422);
    if(stores == null) return ReE(res, {message: 'No Store Found'}, 422); 

    let erruser, users;
    [erruser, users] = await to(User.findAll());


    let alluser = [];
    users.forEach( async function(user, index, arr){
        alluser.push(user.fcm_reg_code);
    });
    stores.forEach( async function(store, index, arr){

        let errprod, getprod;
        [errprod, getprod] =  await to(
            Products.findOne(
                {
                    where: {
                        id: store.productId
                    }
                }
            )
        )
        if(getprod != null) {
            let mess = {
                to : alluser,
                title : 'Special Item\'s On Sale',
                body : getprod.name + ' is on sale. Get your seat to play now',
                datatype: "product",
                datadeeplink: "https://bidbong.com/notification?type=dashboard"
        
            }
            let getFcmService =  fcmService.sendNotificationAll(mess);
            console.log(getFcmService);
        }
    });
}

module.exports.newproductAdd = newproductAdd;