//ES6 IMPORTS:
//import express from "express";
//import mongoose from 'mongoose';
//import cookieSession from 'cookie-session';
//import passport from "passport";
//import keys from "./config/keys";  only this ES6 import is not working. switched back to CommonJS...

const express = require('express'); // for older versions of node that don't support ES6
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // its is important that this is above the require passport file. first the app creates a model schema and ony then tries to make a model instance
require('./models/Survey');
require('./services/passport'); //nothing is exported from passport so we dont need to assign it to a variable


mongoose.connect(keys.mongoURI);

const app = express(); //there can be several express apps in one project

// on post/put/patch request - parse the body and assign it to the req.body property of the incoming request object:
app.use(express.json());

//tell express to enable use of cookies:
app.use(
    cookieSession({
        maxAge/*how long the cookie can exist inside the browser before expiration*/: 30 * 24 * 60 * 60 * 1000, /*30 days in milliseconds*/
        keys: [keys.cookieKey] /*encryption of the cookie, needs to be an array for multiple encryption*/
    })
);
//tell passport to make use of cookies for user authentication:
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); //the require returns a function. we call that function with the app object
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//runs only on deployment:
if (process.env.NODE_ENV === 'production') { // NODE_ENV is a variable automatically set by heroku
    // Express will serve up production assets, like main.js main.css files:
    app.use(express.static('client/build')); //first check - if there is a request coming and there is no route handler for it, then look into the build directory for a matching file
    // Express will serve up the index.html file if it doesn't recognize the route (route was defined in react router and stored in the client side):
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) //second check - if there is no file inside the build directory that matches the request, return the index.html file
    });
}

const PORT = process.env.PORT || 5000 // setting up a dynamic port for horoku deployment. port number is given only seconds before deployment. otherwise use development port which is 5000
app.listen(PORT); //express telling node to watch for incoming traffic on port 5000
