const mongoose = require('mongoose');
const { Schema } = mongoose;// destructuring, equivalent to const Schema = mongoose.Schema;

const userSchema = new Schema({ // schema defines an object with all the different properties we have
    googleId: String, // string value assigned to the googleId key 
    credits: {type: Number, default: 0} // type of field is number and the default value is 0
});

mongoose.model('users'/*name of collection*/, userSchema); // creating a new collection