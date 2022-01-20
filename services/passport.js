const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
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
    try{
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
    }
    catch (error) {
        console.log(error);
    }

}));


//tell passport to read jwt from cookie:
var cookieExtractor = function(req) {
    var token = null;
    if (req && req.headers.cookie) {
        const cookieArray = req.headers.cookie.split(" ");
        for (let cookie of cookieArray) {
            if (cookie.split('=')[0] === 'jwt') {
                token = cookie.split('=')[1];
            }
        }
    }
    return token;
};
// creating a new instance of JwtStrategy:
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: keys.jwtKey
}, (jwt_payload, done) => {
    console.log("JWT BASED AUTH GETTING CALLED");
    //console.log(jwt_payload)
    User.findById(jwt_payload.id, (err, user) => {
        if (err) return done(err, false);
        if (user) {
            return done(null, user);
        } else return done(null, false);
    });

}))
