const { default: mongoose } = require('mongoose');
const { doesRegionIdExist } = require('../models/region.js');
const Region = require("../models/region.js").regionModel;
const user = require('../models/user');
const { setHeaders, isRegionAdmin } = require('./utils');


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

// create region - private
const createRegion = async (req, res, next) => {
    try {
        const userPrivs = await user.getUserPrivs(req);

        if ( isRegionAdmin(userPrivs, req.body.regionId) ||
            process.env.ENV_DEV) {
                const region = new Region(req.body);
                const doesExist = await doesRegionIdExist(userPrivs.regionId)
                console.log(doesExist);
                if (doesExist) {
                    res.status(404).send("Region already exists")
                    return;
                } else {
                    try {
                        region.regionId = userPrivs.regionId;
                        await region.save();
                    } catch {
                        res.setHeader("Content-Type", "text/plain");
                        res.status(400).json(error);
                        return;
                    }
                } 
                res.setHeader("Content-Type", "application/json");
                res.status(201).json(region);
            } else {
                res.status(401).send("Incorrect permissions");
            }
    } catch (error) {
        console.log(error);
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Created');
    }  
}

// update a region by region ID
const updateRegion = async (req, res) => {
    // check if they are an admin and if they match region id
    const userPrivs = await user.getUserPrivs(req);
    let result = null;
    try {    
        if ( isRegionAdmin(userPrivs, req.body.regionId) ||
            process.env.ENV_DEV) {
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
        } else {
            // wrong permissions
            res.status(401).send("Incorrect permissions");
        }
    } catch (error) {
        console.log(error);
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send(error);
        
    }
}

// delete a region by region ID
const deleteRegion = async (req, res) => {
    // check if they are an admin and iff they match region id
    const userPrivs = await user.getUserPrivs(req);

    const regionId = req.params.regionId;
    //console.log(req.body.regionId) 

    try {

        const region = await Region.findOne({"regionId": regionId});
        if (region == null) {
            return res.status(404).send("Not found.")
        }
        
        if ( isRegionAdmin(userPrivs, req.body.regionId) ||
            process.env.ENV_DEV) {
                let result = {};
                try {
                    result = await Region.deleteOne({regionId: { $eq: regionId }});
                    let statusCode = 0;
                    if (result.deletedCount == 0) {
                        statusCode = 404
                    } else {
                        statusCode = 200
                    } 
                    //console.log(result);
                    res.status(200).json(result);

                } catch (error) {
                    res.setHeader("Content-Type", "text/plain");
                    res.status(400).json(error);
                    return;
                }
            } else {
                //console.log(req.body.regionId) 
                res.status(401).send("Incorrect permissions");
            }
    } catch (error) {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Deleted');
    }
}
module.exports = {getRegions, getRegion, createRegion, updateRegion, deleteRegion}

