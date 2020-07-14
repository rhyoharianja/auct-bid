require('dotenv').config();

let sender = process.env.EMAIL || "bid.auct.apps@gmail.com";
let password = process.env.EMAIL_PASS || "P4ssw0rd!";
let smtp = process.env.SMTP_MAIL || "gmail";

var nodeMailer = require('nodemailer');
var EmailTemplate = require('email-templates');

let transporter = nodeMailer.createTransport({
    host:process.env.HOSTNM,
    port:process.env.PORT,
});

const email = new EmailTemplate({
    views: { root: '../resources/static/template/email', options: { extension: 'ejs' } },
    message: {
      from: process.env.EMAIL
    },
    preview:true,
    send: true,
    transport: transporter
    //transport: {
      //jsonTransport: true
    //}
    
  });

exports.sendEmail = function(type, data) {
    let temp;
    if(type == 'reset-password') {
        temp = 'reset-password';
    }
    if(type == 'bidding-status') {
        temp = 'biddingStatus';
    }
    if(type == 'order') {
        temp = 'order';
    }
    if(type == 'payment') {
        temp = 'payment';
    }
    if(type == 'verification') {
        temp = 'verification';
    }
    email.send({
        template: 'test',
        message: {
          to: data.email
        },
        locals: {
          data: data
        }
    }).then(console.log).catch(console.error);
        
    return true;
}
