const passport = require('passport');

module.exports = (app) => { //exporting the function from this file
    //create a route handler and associate it with a certain route:
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }) //passes the user to passport for authentication
    );

    //create another router handler for the case when the user is redirected to loaclhosr:5000/auth/google/callback with a code in the url:
    app.get('/auth/google/callback', 
        passport.authenticate('google'), // passport strategy handles the code and exchanges it with actual google profile. athenticate is a middleware
        (req, res) => {res.redirect('/surveys')}// after authentication the request is redirected to this location
    ); 

    //logging out of the application:
    app.get('/api/logout'/*a route for whoever is logged out of the application*/, (req, res) => {
        req.logout(); // takes the cookie and kills the id stored in the cookie
        // res.send(req.user) - this is just for testing the user is actually logged out, returns a blank browser page with no content
        res.redirect('/'); //redirect the user back to the root route of our application
    });

    //testing authentocation:
    app.get('/api/current_user'/*a route for whoever is logged on to the application*/, (req, res) => {
        res.send(req.user); //this would test if someone who has gone through the authentication flow can access their user
    });
};