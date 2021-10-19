const passport = require('passport');

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
        (req, res) => {res.redirect('/surveys')}
    ); 

    //logging out of the application:
    app.get('/api/logout', (req, res) => {
        req.logout(); // takes the cookie and kills the id stored in the cookie
        // res.send(req.user) - this is just for testing the user is actually logged out
        res.redirect('/');
    });

    //testing authentication:
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};