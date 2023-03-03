const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        Standards: {
            type: String, required: true
        },
        regionId: {
            type: Number, required: true
        },
        signingPassword: {
            type: String, required: true
        },
    });

module.exports = mongoose.model("region", regionSchema, 'regions');
