const { User }          = require('../../models');
const { Stores }        = require('../../models');
const { BiddingTransactions } = require('../../models');
const { ShippingDetails } = require('../../models');
const { Products } = require('../../models');
const { to, ReE, ReS }  = require('../../services/util.service');

const { Op } = require('sequelize');

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');

    let err, currUser;
    currUser = req.user.dataValues;

    [err, users] = await to(User.findOne({
        where: {
          id: currUser.id
        }
    }));
    if(err) return ReE(res, err, 422);

    [err2, stores] = await to(Stores.findAll(
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
                    { model: Products}, 
                    {
                        model: BiddingTransactions,
                        where: { buyerId: currUser.id }
                    }
                ]
            }
        )
    );

    if(err2) return ReE(res, err2, 422);

    return ReS(res, {message:'Successfully Load Detail Users', data:{users,stores}}, 201);
}
module.exports.get = get;

const update = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
    let err, user, data, err2, shipdata,shipdatas;
    user = req.user;
    data = req.body;
    data = {
        zipcode: req.body.zipPostCode
    };
    user.set(data);
    if (Array.isArray(req.files) && req.files.length > 0 ) {
        user.set({avatar : '/uploads/' + req.files[0].filename});
    }
    [err, user] = await to(user.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    if(req.body.shippingType){
        shippingData = {
            userId : user.id,
            shippingType : req.body.shippingType,
            firstName : req.body.firstName,
            lastname : req.body.lastname,
            email : req.body.email,
            phoneNumber : req.body.phoneNumber,
            address : req.body.address,
            city : req.body.city,
            zipPostCode : req.body.zipPostCode,
            country : req.body.country,
            state : req.body.state
        };
        [err2, shipdata] = await to(ShippingDetails.findOne({ 
            where: {
                id: user.id
            }
        }));
        if(err2) return ReE(res, err2, 422);
        if(shipdata != null) {
            [err2, shipdatas] = await to(ShippingDetails.update(
                shippingData,
                {where: {id: shipdata.id} }
            ));
            if(err2) return ReE(res, err, 422);
        } else {
            [err2, shipdatas] = await to(ShippingDetails.create(
                shippingData
            ));
            if(err2) return ReE(res, err, 422);
        }
    }
    return ReS(res, {message :'Updated User: '+user.email, data: user});
}
module.exports.update = update;