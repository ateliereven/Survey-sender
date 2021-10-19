const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
        res.send(surveys);
    })

    app.get('/api/surveys/:surveyId/:choice', (req, res) => { // a better way is to make a thanks component and route the user with react router - needs work
        res.send('Thanks for voting!')
    });

    //recording survey vote:
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice')
        _.chain(req.body)
            .map(({ url, email }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ email, surveyId, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false, lastResponded: new Date() }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true }
                }).exec();
            })
            .value();

        res.send({});
    })

    //creating a new survey:
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        try {
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);

        } catch (error) {
            //console.log(error);
            //console.log(error.response.body);
            res.status(402).send(error); //unprocessable
        }
    });
};