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

const stakeExample = {
    stakeId: 1,
    name: "Kent Washington",
    regionId: 1
}

async function getNewStakeId() {
    returnId = 1;
    try {
        const newId = await stakeModel.find({}).sort({ stakeId: -1 }).limit(1);
        returnId = newId[0]['stakeId'] + 1;
    } catch {
        return returnId;    
    }
    return returnId;

}

stakeModel = mongoose.model("stake", stakeSchema, 'stake');
module.exports = { stakeModel, stakeExample, getNewStakeId };
