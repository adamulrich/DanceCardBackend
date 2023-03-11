const ObjectId = require("mongodb").ObjectId;
const { default: mongoose } = require('mongoose');

const schedule = require('../models/dance').danceModel;

// GET DANCES
async function getAllDances(req, res) {
    // const danceSchedule = req.params.body;
    try {
        // getting dance schedule 
        const result = await schedule.find();
        response.setHeader("Content-Type", "application/json");
        response.status(200).json(result);
        
    } catch (error) {
        setHeader(res, contentText);
        res.status(500).send(error);
    }
};

// GET FUTURE DANCES
const getAllFutureDances = async (req, res) => {
    
    try {
        const dancesSchedule = new Date(new Date - 1);
        dancesSchedule = await schedule.find({'stakeHost' : dancesSchedule});
        response.setHeader("Content-Type", "application/json");
        response.status(200).json(dancesSchedule);

    } catch (error) {
        response.setHeader("Content-Type", "text/plain")
        response.status(404).send('No future dances found.');
    }
};

// CREATE DANCE
const createDance = async (req, res) => {
    try {
        const newDance = new schedule(req.body);
        try {
            await newDance.save()
        } catch (error) {
            setHeader(res, contentText);
            res.status(402).send(error);
            return;
        }
        setHeader(res);
        res.status(201).json(newDance);
    } catch (error) {
        res.setHeader("Content-Type", "text/plain");
        res.status(500).send('Dance not created');
    }
};

// UPDATE A DANCE 
const updateDance = async (req, res) => {

}

// DELETE A DANCE 
const deleteDance = async (req, res) => {

}


module.exports = { getAllDances, getAllFutureDances,  createDance, updateDance, deleteDance };