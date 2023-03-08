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

const danceExample = {
    regionId: "1",
    StakeHost: "Kent Washington",
    theme: "Throwback 90s",
    location: "999 West Over Street, Kent, Washington",
    date: "05/05/2024"
}

danceModel = mongoose.model("dance", danceschema, 'dance');

module.exports = { danceModel, danceExample };

    