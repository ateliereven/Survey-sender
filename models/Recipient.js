//this is a sub document collection associated to Survey

const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientSchema = new Schema({
    email: { type: String, lowercase: true, trim: true },
responded: {type: Boolean, default: false}
});

module.exports = recipientSchema;