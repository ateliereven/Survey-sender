const passport = require('passport');

module.exports = passport.authenticate('jwt', { session: false });
    //console.log('i tried to auth')
    // if (req.user) return next();
    // else return res.status(401).send({ error: 'You must login first' });
