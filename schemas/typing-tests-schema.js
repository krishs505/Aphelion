const mongoose = require('mongoose');

const ttSchema = mongoose.Schema({
    state: {
        type: String
    },
    startingTime: {
        type: Number
    },
    phrase: {
        type: [String]
    },
    user: {
        type: String
    },
    channel: {
        type: String
    },
})

module.exports = mongoose.model('typing-tests', ttSchema);