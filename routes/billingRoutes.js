const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    app.post('/api/stripe', requireLogin /*express will call this function internaly whenever a request come in*/, async (req, res) => {
        const charge = await stripe.charges.create({ //handle the token and reach out the stripe api, then finalize the charge and update the user's nunber of credits
            amount: 500,
            currency: 'usd',
            description: '5$ for 5 credits', //can be anything
            source: req.body.id
        });
        req.user.credits +=5;
        const user = await req.user.save(); //take the updated user and add it to the database
        res.send(user); //send back user to the browser
    })
}