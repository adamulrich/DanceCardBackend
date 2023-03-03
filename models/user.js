const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        stake: {
            type: String, required: true
        },
        ward: {
            type: String, required: true
        },
        parentName: {
            type: String
        },
        parentPhone: {
            type: Number
        },
        cardIsSigned: {
            type: Boolean, required: true
        },
        expirationDate: {
            type: Date, required: true
        },
        email: {
            type: email, required: true
        },
        phone: {
            type: Number
        },
        regionAdmin: {
            type: Boolean, required: true
        },
        regionId: {
            type: Number, required: true
        }
    });

module.exports = mongoose.model("dance", userSchema, 'dances');