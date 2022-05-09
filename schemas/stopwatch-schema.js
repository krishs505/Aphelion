const mongoose = require('mongoose');

const stopwatchSchema = mongoose.Schema({
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
    pausedTime: {
        type: Number
    },
    totalPausedTime: {
        type: Number
    },
})

module.exports = mongoose.model('stopwatch-data', stopwatchSchema);