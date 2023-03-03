const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        wardId: {
            type: Number
        },
        StakeId: {
            type: Number, required: true
        }
    });

module.exports = mongoose.model("ward", wardschema, 'wards');
