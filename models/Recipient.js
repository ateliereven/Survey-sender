//this is a sub document collection associated to Survey

const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientSchema = new Schema({
    email: { type: String, lowercase: true, trim: true }, // convert all the emails to lowercase,trim removes extra white space
responded: {type: Boolean, default: false} // the defult is that the user hasnt clicked yes or no
});

module.exports = recipientSchema;