const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    numOfRecipients: Number,
    strongpositive: { type: Number, default: 0 },
    positive: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    negative: { type: Number, default: 0 },
    strongnegative: { type: Number, default: 0 },
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);