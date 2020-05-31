require('dotenv').config();

const FCM = require('fcm-node');
const serverKey = process.env.FIREBASE_SK;

var fcm = new FCM(serverKey);

const sendNotification = async function (reqData) {
    let message = {
        to: reqData.to, 
        collapse_key: reqData.cp,
        
        notification: {
            title: reqData.title, 
            body: reqData.body
        },
        // data: {  
        //     my_key: reqData.key,
        //     my_another_key: 'my another value'
        // }
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

module.exports.sendNotification = sendNotification;