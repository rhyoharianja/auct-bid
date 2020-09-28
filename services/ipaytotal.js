require('dotenv').config();

const axios = require('axios')
const { to, ReE, ReS, TE }    = require('../services/util.service');

const api_url = process.env.IPAYTOTAL_API;
const api_key = process.env.IPAYTOTLA_KEY;

const api_url_test = process.env.IPAYTOTAL_API_TEST;
const api_key_test = process.env.IPAYTOTLA_KEY_TEST;

const api_url_detail = process.env.IPAYTOTAL_API_DETAIL;

const makePayment = async function (transactions){
    let data = {
        'api_key' : api_key,
        'first_name' : transactions.first_name,
        'last_name' : transactions.last_name,
        'address' : transactions.address,
        'sulte_apt_no' : transactions.sulte_apt_no,
        'country' : transactions.country,
        'state' : transactions.state,
        'city' : transactions.city,
        'zip' : transactions.zip,
        'ip_address' : transactions.ip_address,
        'birth_date' : transactions.birth_date,
        'email' : transactions.email,
        'phone_no' : transactions.phone_no,
        'card_type' : transactions.card_type,
        'amount' : transactions.amount,
        'currency' : transactions.currency,
        'card_no' : transactions.card_no,
        'ccExpiryMonth' : transactions.ccExpiryMonth,
        'ccExpiryYear' : transactions.ccExpiryYear,
        'cvvNumber' : transactions.cvvNumber,
        'shipping_first_name' : transactions.shipping_first_name,
        'shipping_last_name' : transactions.shipping_last_name,
        'shipping_address' : transactions.shipping_address,
        'shipping_country' : transactions.shipping_country,
        'shipping_state' : transactions.shipping_state,
        'shipping_city' : transactions.shipping_city,
        'shipping_zip' : transactions.shipping_zip,
        'shipping_email' : transactions.shipping_email,
        'shipping_phone_no' : transactions.shipping_phone_no,
        'response_url' : 'http://31.207.39.156:3033/v1/payment/response/callback',
        'webhook_url' : 'http://31.207.39.156:3033/v1/payment/response/webhook',
    };

    let res = await axios.post(api_url, data);

    return res.data;
}
module.exports.makePayment = makePayment;

const makePaymentTest = async function (transactions){
    let data = {
        'api_key' : api_key_test,
        'first_name' : 'First Name',
        'last_name' : 'Last Name',
        'address' : 'Address',
        'sulte_apt_no' : 'ORDER-78544646461235',
        'country' : 'US',
        'state' : 'NY', // if your country US then use only 2 letter state code.
        'city' : 'New York',
        'zip' : '38564',
        'ip_address' : '192.168.168.4',
        'birth_date' : '06/12/1990',
        'email' : 'test@gmail.com',
        'phone_no' : '+91999999999',
        'card_type' : '2', // See your card type in list
        'amount' : '10.00',
        'currency' : 'USD',
        'card_no' : '4242424242424242',
        'ccExpiryMonth' : '02',
        'ccExpiryYear' : '2020',
        'cvvNumber' : '123',
        'shipping_first_name' : 'First Name',
        'shipping_last_name' : 'Last Name',
        'shipping_address' : 'Address',
        'shipping_country' : 'US',
        'shipping_state' : 'NY',
        'shipping_city' : 'New York',
        'shipping_zip' : '35656',
        'shipping_email' : 'test@gmail.com',
        'shipping_phone_no' : '+91999999999',
        'response_url' : 'http://31.207.39.156:3033/v1/payment/response/callback',
        'webhook_url' : 'http://31.207.39.156:3033/v1/payment/response/webhook',
    };

    let res = await axios.post(api_url_test, data);

    return res.data;
}
module.exports.makePaymentTest = makePaymentTest;

const response3DSecure = async function (req, res) {
    if(req.query.status == 'success') {
        return ReS(res,{message: 'Success Make Payment', data:req.query}, 201);
    } else {
        return ReS(res,{message: 'Failed Make Payment', data:req.query}, 422);
    }
}
module.exports.response3DSecure = response3DSecure;

const webhookResponse = async function (req, res) {
    if(req.body.transaction_status == 'success') {
        return ReS(res,{message: 'Success Make Payment', data:req.body}, 201);
    } else {
        return ReS(res,{message: 'Failed Make Payment', data:req.body}, 422);
    }
}
module.exports.webhookResponse = webhookResponse;

const detailPaymentTransaction = async function (req, res) {



    let res = await axios.post(api_url_detail, {
        api_key: api_key,
        order_id: req.body.order_id,
        sulte_apt_no: req.body.refId
    });

    return ReS(res,{message: 'Success Make Payment', data:res.data}, 201);
    
}
module.exports.detailPaymentTransaction = detailPaymentTransaction;