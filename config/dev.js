module.exports = {
    googleClientID: 'id-from-google-auth-credentials', //replace with valid key
    googleClientSecret: 'secret-from-google-auth-credentials', //replace with valid key
    mongoURI: 'copied-from-mongodb-connect', //replace with valid key
    cookieKey: 'any0random0string0jlkjfdklajfdajiejijijfdf',
    jwtKey: `any0random0string0ja951fbddfacf2c87cabcf10c122c9d7b37edf906a5ee47c729088774501b1e7e1a051fd21824fcc011becebedd86f0900dd7e`,
    stripePublishableKey: 'key-from-stripe-api', //replace with valid key
    stripeSecretKey: 'key-from-stripe-api', //replace with valid key
    sendGridKey: 'key-from-sendgrid', //replace with valid key
    sendGridFromEmail: "sent-frome@email.com", //fill in email address set up on sengrid
    sendGridEmailTemplateImg: {
        strongPositive: "http://cdn.mcauto-images-production.sendgrid.net/797ab682e3768f95/8500cdca-d667-4b11-b9c1-1d1a7256a68b/256x256.png",
        positive: "http://cdn.mcauto-images-production.sendgrid.net/797ab682e3768f95/e5c72f04-6e94-4f02-99f5-05f420dda783/256x256.png",
        neutral: "http://cdn.mcauto-images-production.sendgrid.net/797ab682e3768f95/912c9a82-17fb-4296-ae33-5f08b83c1f92/256x256.png",
        negative: "http://cdn.mcauto-images-production.sendgrid.net/797ab682e3768f95/25692582-31a5-4429-87a4-5d88b1dda94c/256x256.png",
        strongNegative: "http://cdn.mcauto-images-production.sendgrid.net/797ab682e3768f95/04c36019-c34d-420f-b545-96ca6b890569/256x256.png"
    },
    redirectDomain: 'http://localhost:3000'
};
