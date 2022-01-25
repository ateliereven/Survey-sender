const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const requireJwtAuth = require('../middlewares/requireJwtAuth');

const User = mongoose.model('users');

module.exports = (app) => {

    // Google OAuth //

    // set google auth route:
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
            failureRedirect: '/',
            session: false
        })
    );
    //create another router handler for the case when the user is redirected to loaclhost:5000/auth/google/callback with a code in the url:
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            const token = jwt.sign({ id: req.user._id, googleId: req.user.googleId }, keys.jwtKey, { expiresIn: '48h' });
            res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }).redirect('/surveys')
        }
    );

    // JWT Auth //

    //route for signing in an existing user:
    app.post('/api/signin', async (req, res) => {
        const { email, password } = req.body;
        try {
            // first search for user by email in database:
            const existingUser = await User.findOne({ email });
            if (!existingUser) return res.status(404).send("User doesn't exist");
            // encrypt entered password and check if matches password in database:
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordCorrect) return res.status(400).send("Incorrect password for entered email");
            // if all checks pass create a web token and send it to the browser:
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, keys.jwtKey, { expiresIn: '48h' });
            return res
                .cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }).
                status(200).json({ result: existingUser, token })
        } catch (error) {
            res.status(500).send("Something went wrong...");
        }

    });

    //route for signing up a new user:
    app.post('/api/signup', async (req, res) => {
        const { email, password, confirmPassword } = req.body;
        try {
            //check if the user doesnt already exist:
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).send("User already exists");
            // check confirm password (if the front end already performs this check maybe unnecessary):
            if (password !== confirmPassword) return res.status(400).send("Passwords don't match");
            // encripting password with bcrypt:
            const hashedPassword = await bcrypt.hash(password, 12); //12 is the level of difficulty of the hash
            //creating a new user:
            const user = await new User({
                email,
                password: hashedPassword
            }).save();
            //creating a webtoken with jwt and sending to the browser:
            const token = jwt.sign({ email: user.email, id: user._id }, keys.jwtKey, { expiresIn: '48h' });
            return res
                .cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }).
                status(200).json({ result: user, token });
        } catch (error) {
            res.status(500).send("Something went wrong...");
        }
    });

    //logging out of the application:
    app.get('/api/logout', (req, res) => {
        req.logout(); // takes the cookie and kills the id stored in the cookie
        //res.send(req.user) - this is just for testing the user is actually logged out
        res.redirect('/');
    });

    //testing authentication:
    app.get('/api/current_user', (req, res) => {
        //console.log(req.user)
        res.send(req.user);
    });

//logging in demo user:
    app.post('/api/current_user', async (req, res) => {
        console.log(req.body)
        const { _id } = req.body;
        const existingUser = await User.findOne({ _id });
        res.send(existingUser);
    });

};