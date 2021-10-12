const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content/*this is the string from the survetTemplate*/) { // initialization inside the class
        super();

        this.sgApi = sendgrid(keys.sendGridKey) // sg is short for sendgrid. taking this mailer and sending it off to sendgrid
        this.from_email = new helper.Email('orly.ev.backup@gmail.com'); //the email used in the sendgrid sender
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients); //returning an array of recipients

        this.addContent(this.body); //making sure the body is added ti=o the actual content of the mail. addContent is a built in function to helper.Mail
        this.addClickTracking(); //enable click tracking inside the email
        this.addRecipients(); // take the list of recipients from this.recipients and add them to the mailer
    }

    formatAddresses(recipients) { // taking the list of recipients from the sub document collection, passing it to formatAddresses, and extracting the email property and formatting it with helper.Email
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => { //itterating over the list of recipients, and for each recipient add them to a personalize object
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize); // a function adding the entire personalize object
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request); // API is a function provided by sgApi. sends off to sendgrid
        return response;
    }
}

module.exports = Mailer;