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

const wardExample = {
    name: "Pine Tree Ward",
    WardId: 1,
    StakeId: 1
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
