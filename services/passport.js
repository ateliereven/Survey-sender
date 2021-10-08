//ES6 IMPORTS:
//import passport from "passport";
//import mongoose from 'mongoose'
//import { Strategy as GoogleStrategy } from "passport-google-oauth20";
//import keys from "./config/keys";  only this ES6 import is not working. switched back to CommonJS...

const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users'); // Uer is the model class

// creating token/cookie to identify the user and send it to the browser:
passport.serializeUser((user /*this is the user pulled out of the database*/, done) => {
done(null, user.id /*the id of the record in the database, not the google profile id*/)
});
//for the second request from the user, taking the token (user.id) and sending it back as the user model instance:
passport.deserializeUser((id, done) => {
    User.findById(id/*the id of the record we want to find*/)
    .then(user => done(null, user));
});
 
// creating a new instance of GoogleStrategy with the google keys:
passport.use(new GoogleStrategy({ // sends the user to the ggogle server for authentication
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',// the route in our server the user is sent to after they grant permission to the application
    proxy: true // the callbackURL relative path causes problems in deployment beacuse passport uses http and not https address for heroko, because of heroku proxy. this is unaccepted by google, so setting proxy to true prevents it.
}, (accessToken, refreshToken, profile, done) => { // taking back the information from google
    User.findOne({ googleId: profile.id }) // query - look in the User collection and find an item with this profile.id. returns a promise
        .then((existingUser) => {
            if (existingUser) {
                //we already have a record with the given profile.id
                done(null/*no errors*/, existingUser); // done is a function indicating the operatin has finished and the authentication process can proceed
            } else {
                //we dont have a record with thid id, make a new record
                new User({ googleId: profile.id/*the id coming from the user's google profile*/ }).save() // creating a model instance and saving it to the database. asyncronous operation
                .then(user => done(null, user));
            }
        })
}));