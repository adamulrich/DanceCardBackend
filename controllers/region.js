const { default: mongoose } = require('mongoose');
const Region = require("../models/region.js").regionModel;


// get public region
const getRegions = async (req, res) => {
    try {
        const result = await Region.find({});
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(400).send('Region Not Found');
    }

}
// get public region
const getRegion = async (req, res) => {
    const regionId = req.params.regionId;
    //console.log(regionId);
    try {
        const result = await Region.find({"regionId": regionId});
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(400).send('Region Not Found');
    }

}

// get public region -- needed??
const getPrivateRegion = async (req, res) => {
    const regionId = req.params.regionId;
    try {
        const result = await Region.find({"regionId": regionId});
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(400).send('Region Not Found');
    }

}

// create region - private
const createRegion = async (req, res, next) => {
    try {
        const region = new Region(req.body);
        try {
            await region.save();
        } catch {
            res.setHeader("Content-Type", "text/plain");
            res.status(400).json(error);
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(region);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Created');
    }  
}

module.exports = {getRegions, getRegion, createRegion}