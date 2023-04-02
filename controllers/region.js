const { default: mongoose } = require('mongoose');
const { doesRegionIdExist } = require('../models/region.js');
const Region = require("../models/region.js").regionModel;
const Stake = require('../models/stake.js').stakeModel;
const Ward = require('../models/ward.js').wardModel;
const user = require('../models/user');
const { setHeaders } = require('./utils');


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
        let result = await Region.findOne({"regionId": regionId});
        if (result == null) {
            return res.status(404).send("Not found.")
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Found');
    }
}

const getAllStakesInRegion = async (req, res) => {
    const regionId = req.params.regionId;
    try {
        let result = await Stake.find({ "regionId": regionId });
        if (result == null) {
            return res.status(404).send("Not found.");
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Found');
    }
    
}

const getAllWardsInRegion = async (req, res) => {
    const regionId = req.params.regionId;
    try {
        let result = await Ward.find({ "regionId": regionId });
        if (result == null) {
            return res.status(404).send("Not found.");
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Found');
    }
    
}


// create region - private
const createRegion = async (req, res, next) => {
    try {
        const region = new Region(req.body);
                try {
                        await region.save();
                    } catch (error) {
                        res.setHeader("Content-Type", "text/plain");
                        res.status(400).json(error);
                        return;
                    }
                // } 
                res.setHeader("Content-Type", "application/json");
                res.status(201).json(region);
    } catch (error) {
        console.log(error);
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Created');
    }  
}

// update a region by region ID
const updateRegion = async (req, res) => {
    // check if they are an admin and if they match region id
    let result = null;
    try {    
            try {
                const regionId = req.params.regionId;
                const regionUpdate = req.body;
                
                // update region by region id and save as result
                result = await Region.updateOne ({ 
                    regionId: { $eq: regionId } },
                    regionUpdate,
                        { runValidators: true }
                    );
                
            } catch (error) {
                // update fail
                res.setHeader("Content-Type", "text/plain");
                res.status(400).json(error);
                return;
            }
            let statusCode = 0;
            let modifiedCount =0;
            if (result) {
                modifiedCount = result.modifiedCount
            }
            if (result === null || modifiedCount == 0 ) {
                statusCode = 404
            } else {
                statusCode = 200
            }
            // update success
            res.setHeader("Content-Type", "application/json");
            res.status(statusCode).json(result);
    } catch (error) {
        console.log(error);
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send(error);
        
    }
}

// delete a region by region ID
const deleteRegion = async (req, res) => {
    // check if they are an admin and iff they match region id
 
    const regionId = req.params.regionId;
 
    try {

        const region = await Region.findOne({"regionId": regionId});
        if (region == null) {
            return res.status(404).send("Not found.")
        }
        
                let result = {};
                try {
                    result = await Region.deleteOne({regionId: { $eq: regionId }});
                    let statusCode = 0;
                    if (result.deletedCount == 0) {
                        statusCode = 404
                    } else {
                        statusCode = 200
                    } 
                    res.status(200).json(result);

                } catch (error) {
                    res.setHeader("Content-Type", "text/plain");
                    res.status(400).json(error);
                    return;
                }
    } catch (error) {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Deleted');
    }
}
module.exports = {getRegions, getRegion, createRegion, updateRegion, deleteRegion, getAllStakesInRegion, getAllWardsInRegion}
