const { default: mongoose } = require('mongoose');
const region = require("../models/region.js").regionModel;

// get region
const getRegion = async (req, res) => {
    const regionId = req.params.regionId;
    console.log(regionId);
    try {
        const result = await region.find({"regionId": regionId});
        console.log(res);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(400).send('Region Not Found');
    }

}

module.exports = {getRegion}