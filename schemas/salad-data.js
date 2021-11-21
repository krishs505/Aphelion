const mongoose = require('mongoose');

const saladDataSchema = mongoose.Schema({
    mph: {
        type: [Number]
    },
    inc: {
        type: [Number]
    },
    hrs: {
        type: [Number]
    },
    dts: {
        type: [String]
    },
})

module.exports = mongoose.model('salad-data', saladDataSchema);