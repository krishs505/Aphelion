const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    statuses: {
        type: [String]
    },
})

module.exports = mongoose.model('settings', settingsSchema);