// values for each one of these keys is pulled from heroku
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    jwtKey: process.env.JWT_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    sendGridKey: process.env.SEND_GRID_KEY,
    sendGridFromEmail: process.env.SEND_GRID_FROM_EMAIL,
    sendGridEmailTemplateImg: {
        strongPositive: "http://cdn.mcauto-images-production.sendgrid.net/4d6124dda3479a24/a3b731b8-e723-4f4a-95db-6b33884bbda2/256x256.png",
        positive: "http://cdn.mcauto-images-production.sendgrid.net/4d6124dda3479a24/5c4f22c0-f755-4779-9d19-77f117044aea/256x256.png   ",
        neutral: "http://cdn.mcauto-images-production.sendgrid.net/4d6124dda3479a24/3335ac20-aef4-4879-aa84-d76da995058e/256x256.png",
        negative: "http://cdn.mcauto-images-production.sendgrid.net/4d6124dda3479a24/7260216b-1530-4827-a140-eca00a2b2759/256x256.png",
        strongNegative: "http://cdn.mcauto-images-production.sendgrid.net/4d6124dda3479a24/d116530f-123b-4a0b-9ab4-ac263cd89788/256x256.png"
    },
    redirectDomain: process.env.REDIRECT_DOMAIN
};