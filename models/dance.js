// dance schema
const mongoose = require('mongoose');

const danceSchema = new mongoose.Schema(
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
        },
        id: {
            type: Number, required: true
        }
    });

const danceExample = {
    regionId: "1",
    stakeHost: "Kent Washington",
    theme: "Throwback 90s",
    location: "999 West Over Street, Kent, Washington",
    dateTime: "2024-05-29"
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

module.exports = { danceModel, danceExample, getNewDanceId};

    