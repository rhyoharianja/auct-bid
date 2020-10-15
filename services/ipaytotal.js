require('dotenv').config();

const axios = require('axios')
const { to, ReE, ReS, TE }    = require('../services/util.service');
const { BiddingTransactions, KeyTransactions } = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const api_url = process.env.IPAYTOTAL_API;
const api_key = process.env.IPAYTOTLA_KEY;

const api_url_detail = process.env.IPAYTOTAL_API_DETAIL;

const makePayment = async function (transactions, keyVals){
    let data = {
        'api_key' : api_key,
        'first_name' : transactions.shipping.firstName,
        'last_name' : transactions.shipping.firstName,
        'address' : transactions.shipping.address,
        'sulte_apt_no' : keyVals + '-' + transactions.id,
        'country' : transactions.country,
        'state' : transactions.shipping.state,
        'city' : transactions.shipping.city,
        'zip' : transactions.shipping.zipPostCode,
        'ip_address' : '31.207.39.156',
        'birth_date' : '06/12/1990',
        'email' : transactions.shipping.email,
        'phone_no' : transactions.shipping.phoneNumber,
        'card_type' : transactions.card_type,
        'amount' : transactions.amount,
        'currency' : transactions.currency,
        'card_no' : transactions.card_no,
        'ccExpiryMonth' : transactions.ccExpiryMonth,
        'ccExpiryYear' : transactions.ccExpiryYear,
        'cvvNumber' : transactions.cvvNumber,
        'shipping_first_name' : transactions.shipping.firstName,
        'shipping_last_name' : transactions.shipping.firstName,
        'shipping_address' : transactions.shipping.address,
        'shipping_country' : transactions.country,
        'shipping_state' : transactions.shipping.state,
        'shipping_city' : transactions.shipping.city,
        'shipping_zip' : transactions.shipping.zipPostCode,
        'shipping_email' : transactions.shipping.email,
        'shipping_phone_no' : transactions.shipping.phoneNumber,
        'response_url': "http://31.207.39.156:3033/v1/payment/response/callback",
        'webhook_url': "http://31.207.39.156:3033/v1/payment/response/webhook",
    };

    let res = await axios.post(api_url, data);

    return res.data;
}
module.exports.makePayment = makePayment;

const makePaymentTest = async function (req, res){
    let err, user, datareq;
    datareq = req.body;
    if(resdata.data.status === 'fail') {
        return ReS(res, { message: resdata.data.message, data: resdata.data }, 406);
    } else if(resdata.data.status === 'failed'){
        pstatus = 14
    } else {
        pstatus = 12
    }
    
    let resdata = await axios.post(api_url, datareq);

    return ReS(res,{message: 'Success Make Payment', data: resdata.data }, 201);
}
module.exports.makePaymentTest = makePaymentTest;

const response3DSecure = async function (req, res) {
    let err, payOrder, dats;
    dats = req.query.sulte_apt_no.split('-');
    if(dats[0] == 'order'){
        if(req.query.status == 'success') {
            [err, payOrder] = await to(BiddingTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 12,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
        
            if(err) return ReE(res, err, 422);
    
            return ReS(res,{message: 'Success Make Payment Order', data:req.query}, 201);
        } else {
            [err, payOrder] = await to(BiddingTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 15,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
            if(err) return ReE(res, err, 422);
            return ReE(res,{message: 'Failed Make Payment Order', data:req.query}, 201);
        }
    } else {
        if(req.query.status == 'success') {
            [err, payOrder] = await to(KeyTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 12,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
        
            if(err) return ReE(res, err, 422);
    
            return ReS(res,{message: 'Success Make Payment Keys', data:req.query}, 201);
        } else {
            [err, payOrder] = await to(KeyTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 15,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
            if(err) return ReE(res, err, 422);
            return ReE(res,{message: 'Failed Make Payment Keys', data:req.query}, 201);
        }
    }
}
module.exports.response3DSecure = response3DSecure;

const webhookResponse = async function (req, res) {
    let err, payOrder, dats;
    console.log(req.query.sulte_apt_no);
    dats = req.query.sulte_apt_no.split('-');
    if(dats[0] == 'order'){
        if(req.query.status == 'success') {
            [err, payOrder] = await to(BiddingTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 12,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
        
            if(err) return ReE(res, err, 422);
    
            return ReS(res,{message: 'Success Make Payment Order', data:req.query}, 201);
        } else {
            [err, payOrder] = await to(BiddingTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 15,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
            if(err) return ReE(res, err, 422);
            return ReE(res,{message: 'Failed Make Payment Order', data:req.query}, 201);
        }
    } else {
        if(req.query.status == 'success') {
            [err, payOrder] = await to(KeyTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 12,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
        
            if(err) return ReE(res, err, 422);
    
            return ReS(res,{message: 'Success Make Payment Keys', data:req.query}, 201);
        } else {
            [err, payOrder] = await to(KeyTransactions.update(
                {
                    payment_trxid: req.query.order_id,
                    paymentStatus: 15,
                    paymentDate: new Date(),
                    ipayment_status: req.query.status,
                    ipayment_desc: req.query.message
                },
                {where: {id: dats[1]} }
            ));
            if(err) return ReE(res, err, 422);
            return ReE(res,{message: 'Failed Make Payment Keys', data:req.query}, 201);
        }
    }
}
module.exports.webhookResponse = webhookResponse;

const detailPaymentTransaction = async function (req, res) {

    let resdata = await axios.post(api_url_detail, {
        api_key: api_key,
        order_id: req.body.order_id,
        sulte_apt_no: req.body.refId
    });

    return ReS(res,{message: 'Success Make Payment', data:resdata.data}, 201);
    
}
module.exports.detailPaymentTransaction = detailPaymentTransaction;