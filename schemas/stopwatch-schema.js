const mongoose = require('mongoose');

const stopwatchSchema = mongoose.Schema({
    state: {
        type: String
    },
    startingTime: {
        type: Number
    },
    pausedTime: {
        type: Number
    },
    totalPausedTime: {
        type: Number
    },
})

module.exports = mongoose.model('stopwatch-data', stopwatchSchema);