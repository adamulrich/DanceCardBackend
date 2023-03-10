const ObjectId = require("mongodb").ObjectId;
const { default: mongoose } = require('mongoose');

const schedule = require('../models/dance').danceModel;

// GET DANCES
async function getDanceSchedule(req, res) {
    const danceSchedule = req.params.body;

    try {
        // getting dance schedule 
        const result = await schedule.find({

        });
        
    } catch (error) {
        
    }
}

// GET FUTURE DANCES




module.exports = { getDanceSchedule };