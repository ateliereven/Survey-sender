const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

// creating token/cookie to identify the user and send it to the browser:
passport.serializeUser((user, done) => {
    done(null, user.id)
});
//for the second request from the user, taking the token (user.id) and sending it back as the user model instance:
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user));
});

// creating a new instance of GoogleStrategy with the google keys:
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(null, existingUser);
    }
    const user = await new User({ googleId: profile.id }).save();
    done(null, user);

}));