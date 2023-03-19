const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        wardId: {
            type: Number
        },
        stakeId: {
            type: Number, required: true
        },
        regionId: {
            type: Number, required: true
        }

    });

    wardSchema.virtual('region', {
        ref: 'region',
        localField: 'regionId',
        foreignField: 'regionId',
        justOne: true // for many-to-1 relationships
    });
    
    wardSchema.virtual('stake', {
        ref: 'stake',
        localField: 'stakeId',
        foreignField: 'stakeId',
        justOne: true // for many-to-1 relationships
    });
    

const wardExample = {
    name: "Pine Tree Ward",
    wardId: 1,
    regionId: 1,
    stakeId: 1
}

async function getNewWardId() {
    returnId = 1;
    try {
        const newId = await wardModel.find({}).sort({ wardId: -1 }).limit(1);
        returnId = newId[0]['wardId'] + 1;
    } catch {
        return returnId;    
    }
    return returnId;

}


wardModel = mongoose.model("ward", wardSchema, 'ward')
module.exports = {wardModel, wardExample, getNewWardId};
