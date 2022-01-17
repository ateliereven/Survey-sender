const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = mongoose.model('users');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //create another router handler for the case when the user is redirected to loaclhosr:5000/auth/google/callback with a code in the url:
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => { res.redirect('/surveys') }
    );
    //signing in an existing user:
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
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, keys.jwtKey, { expiresIn: '30d' });

            //res.send(token);
            //res.status(200).send(existingUser);
            //request.headers.authorization = token;
            return res
            .cookie("access_token", token, {httpOnly: true, secure: process.env.NODE_ENV === "production"}).
            status(200).json({result: existingUser, token})
        } catch (error) {
            res.status(500).send("Something went wrong...");
        }
        //localStorage.setItem... complete
    })
    //signing up a new user:
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
            const user = new User({
                email,
                password: hashedPassword
            });
            await user.save();
            //creating a webtoken with jwt:
            const token = jwt.sign({ email: user.email, id: user._id }, keys.jwtKey, { expiresIn: '30d' });
            //res.send(token);
            //res.status(200).send(user);
            res.status(200).json({ result: user, token })
        } catch (error) {
            console.log(error);
            res.status(500).send("Something went wrong...");
        }

    })
    //logging out of the application:
    app.get('/api/logout', (req, res) => {
        req.logout(); // takes the cookie and kills the id stored in the cookie
        //res.send(req.user) - this is just for testing the user is actually logged out
        //localStorage.clear() // delete what was saved to the local storage;
        res.redirect('/');
    });

    //testing authentication:
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};