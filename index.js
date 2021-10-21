const express = require('express'); 
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // its is important that this is above the require passport file.
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json());

//enable use of cookies:
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
//tell passport to make use of cookies for user authentication:
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//runs only on deployment:
if (process.env.NODE_ENV === 'production') { 
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
//ports on prod || dev:
const PORT = process.env.PORT || 5000
app.listen(PORT);
