const mongoose = require('mongoose');

const serverDataSchema = mongoose.Schema({
    count: {
        type: Number
    },
    date: {
        type: [Number]
    },
    counts: {
        type: [Number]
    }
})

module.exports = mongoose.model('server-data', serverDataSchema);