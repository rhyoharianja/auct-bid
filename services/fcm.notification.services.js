require('dotenv').config();

const FCM = require('fcm-node');
const serverKey = process.env.FIREBASE_SK;

var fcm = new FCM(serverKey);

const sendNotification = async function (req, res) {
    let message = {
        to: 'registration_token', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}