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

const userExample = {
    name: "Sara Johnson",
    stake: "Ken Washington",
    ward: "Pine Tree Ward",
    parentName: "Bobby Johnson",
    parentPhone: "123-456-7890",
    cardIsSigned: false,
    expirationDate: "05/05/2024",
    email: "sj@gmail.com",
    phone: "123-456-0000",
    regionAdmin: false,
    regionId: 1
}

userModel = mongoose.model("user", userSchema, 'user')
module.exports = {userModel, userExample}
