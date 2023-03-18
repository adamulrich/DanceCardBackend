const { default: mongoose } = require('mongoose');
const Region = require("../models/region.js").regionModel;
const user = require('../models/user');


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
    console.log(regionId);
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
        const userPrivs = await user.getUserPrivs(req);

        if ( (userPrivs.regionAdmin && req.body.regionId == userPrivs.regionId) ||
            process.env.ENV_DEV) {
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
            } else {
                res.status(401).send("Incorrect permissions");
            }
    } catch (error) {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Created');
    }  
}

// update a region by region ID
const updateRegion = async (req, res) => {
    try {
        // check if they are an admin and if they match region id
        const userPrivs = await user.getUserPrivs(req);
        if ( (userPrivs.regionAdmin && req.body.regionId == userPrivs.regionId) ||
            process.env.ENV_DEV) {

                try {
                    const regionId = req.params.regionId;
                    const regionUpdate = req.body;

                    // update region by region id and save as result
                    const result = await Region.updateOne ({ 
                        regionId: { $eq: regionId } },
                        regionUpdate,
                            { runValidators: true }
                        );
                    
                    // update success
                    res.status(204).json(result);

                } catch (error) {
                    // update fail
                    res.setHeader("Content-Type", "text/plain");
                    res.status(400).json(error);
                    return;
                }
            } else {
                // wrong permissions
                res.status(401).send("Incorrect permissions");
            }
    } catch (error) {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Region Not Updated');
    }
}

// delete a region by region ID
const deleteRegion = async (req, res) => {

    const regionId = req.params.regionId;
    //console.log(req.body.regionId) 

    try {
        // check if they are an admin and iff they match region id
        const userPrivs = await user.getUserPrivs(req);
        if ( (userPrivs.regionAdmin && req.body.regionId == userPrivs.regionId) ||
            process.env.ENV_DEV) {
                try {

                    const result = await Region.deleteOne({
                        regionId: { $eq: regionId } 
                    });
                    console.log(result);
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