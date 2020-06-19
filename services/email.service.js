require('dotenv').config();

let sender = process.env.EMAIL || "email";
let password = process.env.EMAIL_PASS || "password";
let smtp = process.env.SMTP_MAIL || "smtp";

let nodeMailer = require('nodemailer');
let EmailTemplate = require('email-templates').EmailTemplate;

let transporter = nodeMailer.createTransport(sender + ':' + password + smtp);

let ResetPasswordTemplate = transporter.templateSender(
    new EmailTemplate('../resource/template/email/reset-password', {
        from: 'no-reply@auct-bid.com',
    })
);

let BiddingStatusTemplate = transporter.templateSender(
    new EmailTemplate('../resource/template/email/biddingStatus', {
        from: 'no-reply@auct-bid.com',
    })
);

let OrderTemplate = transporter.templateSender(
    new EmailTemplate('../resource/template/email/order', {
        from: 'no-reply@auct-bid.com',
    })
);

let PaymentTemplate = transporter.templateSender(
    new EmailTemplate('../resource/template/email/payment', {
        from: 'no-reply@auct-bid.com',
    })
);

let verificationTemplate = transporter.templateSender(
    new EmailTemplate('../resource/template/email/verification', {
        from: 'no-reply@auct-bid.com',
    })
);

exports.sendEmail = function(type, data) {
    if(type == 'reset-password') {
        ResetPasswordTemplate({
            to: data.useremail,
            subject: 'Reset Password Auct-Bid ' + data.userfullname
        }, {
            data
        }, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Link sent\n' + JSON.stringify(info));
            }
        });
    }
    if(type == 'bidding-status') {
        BiddingStatusTemplate({
            to: data.email,
            subject: 'Reset Password Email' + data.user.fullname
        }, {
            data
        }, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Link sent\n' + JSON.stringify(info));
            }
        });
    }
    if(type == 'order') {
        OrderTemplate({
            to: data.email,
            subject: 'Reset Password Email' + data.user.fullname
        }, {
            data
        }, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Link sent\n' + JSON.stringify(info));
            }
        });
    }
    if(type == 'payment') {
        PaymentTemplate({
            to: data.email,
            subject: 'Reset Password Email' + data.user.fullname
        }, {
            data
        }, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Link sent\n' + JSON.stringify(info));
            }
        });
    }
    if(type == 'verification') {
        verificationTemplate({
            to: data.email,
            subject: 'Reset Password Email' + data.user.fullname
        }, {
            data
        }, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Link sent\n' + JSON.stringify(info));
            }
        });
    }
}
