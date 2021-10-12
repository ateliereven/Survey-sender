const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //an array containing a list of records that conform with recipientSchema
    yes: { type: Number, default: 0 }, // counting yes votes
    no: { type: Number, default: 0 }, // counting no votes
    _user: {type: Schema.Types.ObjectId, ref: 'User'}, // every survey is going to belong to a paticulae user
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);