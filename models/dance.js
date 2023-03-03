// dance schema
const mongoose = require('mongoose');

const danceschema = new mongoose.Schema(
    {
        regionId: {
            type: Number, required: true
        },
        stakeHost: {
            type: String, required: true
        },
        theme: {
            type: String, required: true
        },
        location: {
            type: String, required: true
        },
        dateTime: {
            type: Date, required: true
        }
    });

module.exports = mongoose.model("dance", danceschema, 'dances');

    