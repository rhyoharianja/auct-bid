const { User }          = require('../../models');
const { Stores }        = require('../../models');
const { BiddingTransactions } = require('../../models');
const { products } = require('../../models');
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
                    { model: products}, 
                    {
                        model: BiddingTransactions,
                        where: { buyerId: currUser.id }
                    }
                ]
            }
        )
    );

    if(err2) return ReE(res, err, 422);

    return ReS(res, {message:'Successfully Load Detail Users', data:{users,stores}}, 201);
}
module.exports.get = get;

const update = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, currUser, data;
  console.log(req);
  currUser = req.user.dataValues;
  data = req.body;
  data.avatar = '/uploads/' + req.files[0].filename;
  [err, user] = await to(User.update(
    data,
    {where: {id: currUser.id} }
  ));
  if(err) return ReE(res, err, 422);

  [err, user] = await to(User.findOne({where: {id: currUser.id} }));

  if(err) return ReE(res, err, 422);


  return ReS(res, {message:'Successfully Update Detail Users', data:user}, 201);
}
module.exports.update = update;