require('dotenv').config();

const FCM = require('fcm-node');
const serverKey = process.env.FIREBASE_SK;

var fcm = new FCM(serverKey);

const { inbox_notifies } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const sendNotification = async function (reqData) {
    let errsave, succsave;
    let message = {
        to: reqData.to, 
        collapse_key: 'green',
        
        notification: {
            title: reqData.title, 
            body: reqData.body
        },
        data: {  
            my_key: reqData.datatype,
            my_another_key: reqData.datadeeplink
        }
    };

    if (typeof obj.foo === 'undefined') {
        [errsave, succsave] = await to(inbox_notifies.create({
            fcm_code: reqData.to,
            title: reqData.title,
            body: reqData.body,
            type: reqData.datatype,
            deeplink: reqData.datadeeplink,
            read: 0,
            status: 1,
        }));
    }

    fcm.send(message, function(err, response){
        if (err) {
            console.log(err);
            return false;
        } else {
            console.log("Successfully sent with response: ", response);
            return true;
        }
    });
}

module.exports.sendNotification = sendNotification;