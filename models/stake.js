const mongoose = require('mongoose');

const stakeSchema = new mongoose.Schema(
    {
        stakeId: {
            type: Number, required: true
        },
        name: {
            type: String, required: true
        },
        regionId: {
            type: Number, required: true
        }
    });

module.exports = mongoose.model("stake", Stakeschema, 'stakes');
