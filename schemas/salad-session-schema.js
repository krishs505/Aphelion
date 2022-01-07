const mongoose = require('mongoose');

const saladSessionSchema = mongoose.Schema({
    m: {
        type: Boolean
    },
    bAmt: {
        type: Number
    },
    bT: {
        type: [Number]
    },
    bM: {
        type: Number
    },
    wfd: {
        type: Boolean
    },
})

module.exports = mongoose.model('salad-session', saladSessionSchema);