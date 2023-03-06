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

const regionModel = mongoose.model("region", regionSchema, 'region');

module.exports = {regionModel, regionExample};
