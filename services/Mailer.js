const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer {
    constructor({ subject, recipients }, content/*this is the string from the surveyTemplate*/) { // initialization inside the class

        sgMail.setApiKey(keys.sendGridKey) // sg is short for sendgrid. taking this mailer and sending it off to sendgrid
        this.msg = {
            to: recipients,
            from: "orly.ev.backup@gmail.com", //the email used in the sendgrid sender
            subject: subject,
            html: content,
            trackingSettings: { 
                clickTracking: { enable: true },
                enable_text: true
             } //enable click tracking inside the email
        };
    }

    async send() {
        const response = await sgMail.send(this.msg) // sends off to sendgrid. sendMultiple instead of send is for sending multiple individual emails to multiple recipients where they don't see each others email addresses. requires personalization.
        return response;
    }
}

module.exports = Mailer;