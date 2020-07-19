require('dotenv').config();

const FCM = require('fcm-node');
const serverKey = process.env.FIREBASE_SK;

var fcm = new FCM(serverKey);

const sendNotification = async function (reqData) {
    let message = {
        to: reqData.to, 
        collapse_key: 'green',
        
        notification: {
            title: reqData.title, 
            body: reqData.body
        },
        data: {  
            my_key: reqData.to,
            my_another_key: reqData.to
        }
    };
    console.log(message);
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