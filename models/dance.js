// dance schema
const mongoose = require('mongoose');

const danceSchema = new mongoose.Schema(
    {
        id: {
            type: Number, required: true
        },
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
    id: 1,
    regionId: "1",
    StakeHost: "Kent Washington",
    theme: "Throwback 90s",
    location: "999 West Over Street, Kent, Washington",
    date: "05/05/2024"
}

async function getNewDanceId() {
    returnId = 1;
    try {
        const newId = await danceModel.find({}).sort({ id: -1 }).limit(1);
        returnId = newId[0]['id'] + 1;
    } catch {
        return returnId;    
    }
    return returnId;

}

danceModel = mongoose.model("dance", danceSchema, 'dance');

module.exports = { danceModel, danceExample, getNewDanceId };

    