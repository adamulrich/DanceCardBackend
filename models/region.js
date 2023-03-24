const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true
        },
        standards: {
            type: String, required: true
        },
        regionId: {
            type: Number, required: true
        },
        signingPassword: {
            type: String, required: true
        },
    });

const regionExample = {
    name: "South Puget Sound", 
    standards: "TBD", 
    regionId: 1,
    signingPassword: "DanceMachine"
}
async function doesRegionIdExist(regionId) {
    //console.log(regionId);
    try {
        const id = await regionModel.findOne({"regionId": regionId});
        console.log("ID: " + JSON.stringify(id));
        if (id == null) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;    
    }
}

const regionModel = mongoose.model("region", regionSchema, 'region');

module.exports = {regionModel, regionExample, doesRegionIdExist};
