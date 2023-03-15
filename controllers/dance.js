const ObjectId = require("mongodb").ObjectId;
const { default: mongoose } = require('mongoose');

const schedule = require('../models/dance').danceModel;
const danceId = require('../models/dance').getNewDanceId;

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

    try {
        const newDance = new schedule(req.body);
        const newDanceId = await danceId();
        console.log(newDanceId);
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
};

// UPDATE A DANCE 
const updateDance = async (req, res) => {
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
}}

// DELETE A DANCE 
const deleteDance = async (req, res) => {

}


// sets the headers for the response
function setHeaders(res, contentType) {
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
}

module.exports = { getAllDances, getAllFutureDances,  createDance, updateDance, deleteDance, setHeaders };