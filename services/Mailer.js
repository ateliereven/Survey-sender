const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer {
    constructor({ subject, recipients }, content) {

        sgMail.setApiKey(keys.sendGridKey)
        this.msg = {
            to: recipients,
            from: keys.sendGridFromEmail,
            subject: subject,
            html: content,
             //enable click tracking inside the email:
            trackingSettings: { 
                clickTracking: { enable: true },
                enable_text: true
             }
        };
    }

    async send() {
        const response = await sgMail.send(this.msg)
        return response;
    }
}

module.exports = Mailer;