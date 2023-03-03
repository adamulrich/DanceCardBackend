const { truncate } = require('fs');
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
        stakes: [{
            name: {
                type: String, required: true
            },
            stakeId: {
                type: Number
            },
            wards: [{
                name: {
                    type: String, required: true
                },
                wardId: {
                        type: Number
                    }
            }]
        }]

    });

module.exports = mongoose.model("region", regionSchema, 'regions');