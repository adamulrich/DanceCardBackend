const ObjectId = require("mongodb").ObjectId;
const { default: mongoose } = require('mongoose');
const { setHeaders, isRegionAdmin } = require('./utils');
const schedule = require('../models/dance').danceModel;
const danceId = require('../models/dance').getNewDanceId;
const user = require('../models/user');
const { getUserPrivs } = require('../models/user');


// GET DANCES
async function getAllDances(req, res) {
    const regionId = req.params.regionId;
    // console.log(regionId);
    try {
        // getting dance schedule 
        const result = await schedule.find({"regionId": regionId});
        console.log(result);
        setHeaders(res, "application/json");
        res.status(200).json(result);
        
    } catch (error) {
        setHeaders(res, 'text/plain');
        console.log(error);
        res.status(500).send(error);
    }
};

// GET FUTURE DANCES
const getAllFutureDances = async (req, res) => {
    const regionId = req.params.regionId;
    try {
        let danceDate = new Date();
        danceDate.setDate(danceDate.getDate()-1);
        // console.log(danceDate);
        const dancesSchedule = await schedule.find({'dateTime' : {$gte: danceDate}, 'regionId': regionId });
        // console.log(dancesSchedule);
        setHeaders(res, "application/json");
        res.status(200).json(dancesSchedule);

    } catch (error) {
        setHeaders(res, "text/plain")
        res.status(404).send('No future dances found.');
    }
};

// CREATE DANCE
const createDance = async (req, res) => {
    const userPrivs = await user.getUserPrivs(req);
    if (isRegionAdmin(userPrivs, req.body.regionId) || process.env.ENV_DEV) {
        try {
            const newDance = new schedule(req.body);
            const newDanceId = await danceId();
            // console.log(newDanceId);
            try {
                newDance['id'] = newDanceId;
                await newDance.save()
                // console.log(newDance);

            } catch (error) {
                setHeaders(res, 'text/plain');
                res.status(404).json(error);
                return;
            }
            setHeaders(res, 'application/json');
            res.status(201).json(newDance);
        } catch (error) {
            setHeaders(res, "text/plain");
            res.status(500).send('Dance not created');
        }
        } else {
            res.status(401).send("You are not Permitted");
        }
};

// UPDATE A DANCE 
const updateDance = async (req, res) => {
    const userPrivs = await user.getUserPrivs(req);
    if (isRegionAdmin(userPrivs, req.body.regionId) || process.env.ENV_DEV) {
        try {
            const danceId = req.params.id;
            const dance = req.body;
            dance['id'] = danceId;
            let result = null;
            try {
                result = await schedule.updateOne({ id: { $eq: danceId } }, dance, { runValidators: true });
            } catch (error) {
                setHeaders(res, "text/plain");
                res.status(422).send(`Bad data. ${error}`);
                return;
            }
            let statusCode = 0;
            let modifiedCount = 0;
            if (result) {
                modifiedCount = result.modifiedCount
            }
            // if we don't have a result or the modifiedCount is 0 set the status code to 404
            if (result === null || modifiedCount == 0 ) {
                statusCode = 404
            } else {
                statusCode = 200
            }
            setHeaders(res, 'application/json');
            res.status(statusCode).send(result);

        } catch (error) {
        res.status(500).send(`${error}`);
        }} else {
            res.status(401).send("You are not Permitted");
        }
}

// DELETE A DANCE 
const deleteDance = async (req, res) => {
    const userPrivs = await user.getUserPrivs(req);
    if (isRegionAdmin(userPrivs, req.body.regionId) || process.env.ENV_DEV) {
    try {
        const {id} = req.params;
        let removeDance = {};
        try {
            removeDance = await schedule.deleteOne({'id': id});
            console.log(danceId);
            return res.status(200).json(removeDance);

        } catch (error) {
            setHeaders(res, 'text/plain');
            res.status(400).json(error);
        }
    } catch (error) {
        setHeaders(res, 'text/plain');
        res.status(500).send("Dance Not Deleted");
    }
    let modifyCount = 0;
        if (removeDance.deletedCount == 0) {
            modifyCount = 404
        } else {
            modifyCount = 200
        }
    }else {
        res.status(401).send("You are not Permitted");
    }
}



module.exports = { getAllDances, getAllFutureDances,  createDance, updateDance, deleteDance, setHeaders };