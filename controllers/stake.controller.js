const { default: mongoose } = require('mongoose');
const Stake = require("../models/stake").stakeModel;
const contentText = 'text/plain';
const {getNewStakeId} = require('../models/stake');
const contentJson = 'application/json';
const { setHeaders, isRegionAdmin } = require('./utils');

const { getUserPrivs } = require('../models/user');


const add_one = async (req, res) => {
  try {
    const userPrivs = await getUserPrivs(req);
    if ( isRegionAdmin(userPrivs, req.body.regionId) ||
      process.env.ENV_DEV) {
      
      const stake = Stake(req.body);
      stake.stakeId = await getNewStakeId();
      await stake
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(404).json({ message: "Stake not created" }));

      return;
    } else {
      setHeaders(res, contentText);
      res.status(403).send("Incorrect permissions.");
    }

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



const getall = async (req, res) => {
  try {
    await Stake
      .find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not found" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



const getallbyregion = async (req, res) => {
  try {
    const { id } = req.params;
    await Stake
      .find({'regionId': id})
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not found" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Stake.findOne({ 'stakeId': id });

    if (result == null || result.length == 0) {
      setHeaders(res, contentText);
      res.status(404).send(result);
    } else {

      setHeaders(res,contentJson)
      res.status(200).json(result);
    return;

  }

      
  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



const delete_one = async (req, res) => {
  try {
    const userPrivs = await getUserPrivs(req);
   if ( isRegionAdmin(userPrivs, req.body.regionId) ||
      process.env.ENV_DEV) {
      const { id } = req.params;
      try {
        //get user data from model
        result = await Stake.deleteOne({ 'stakeId': id });
        console.log(result);
    } catch (error) {
        setHeaders(res, contentText);
        res.status(422).send(`Bad data. ${error}`);
        return;
    }
    // if deletedCount is 0 set the status code to 404
    let statusCode = 0;
    if (result.deletedCount == 0) {
        statusCode = 404
    } else {
        statusCode = 200
    }
    setHeaders(res, contentText);
    res.status(statusCode).send(result);

  } else {
    setHeaders(res, contentText);
    res.status(403).send("Incorrect permissions.");
  }

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};


const update_one = async (req, res) => {
  try {
    const userPrivs = await getUserPrivs(req);
    if ( isRegionAdmin(userPrivs, req.body.regionId) ||
      process.env.ENV_DEV) {
      const { id } = req.params;
      const updatedStake = req.body;
      Stake
        .updateOne({ stakeId: { $eq: id } },
          updatedStake,
          { runValidators: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Stake not updated" }));

      return;
    } else {
      setHeaders(res, contentText);
      res.status(403).send("Incorrect permissions.");
    }

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};

module.exports = { add_one, getallbyregion, getSingle, delete_one, update_one }
