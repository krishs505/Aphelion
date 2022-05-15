const mongoose = require('mongoose');

const serverDataSchema = mongoose.Schema({
    count: {
        type: Number
    },
    users: {
        type: [String]
    },
    usercounts: {
        type: [Number]
    },
    date: {
        type: [Number]
    },
    counts: {
        type: [Number]
    },
    dates: {
        type: [String]
    }
})

module.exports = mongoose.model('server-data', serverDataSchema);