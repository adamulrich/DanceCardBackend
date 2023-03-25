const { default: mongoose } = require('mongoose');
const Ward = require("../models/ward").wardModel;
const contentText = 'text/plain';
const contentJson = 'application/json';
const {getNewWardId} = require('../models/ward');
const { setHeaders } = require('./utils');


const getall = async (req, res) => {
  try {
    await Ward
      .find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not found" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};


const getAllByStake = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Ward
      .find({'stakeId': id})
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not found" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Ward.findOne({ 'wardId': id })
    .populate('stake')
    .populate('region');
      

    if (result == null || result.length == 0) {
      setHeaders(res, contentText);
      res.status(404).send(result);
    } else {
      const returnValue = {};
      returnValue.wardId = result.wardId;
      returnValue.name = result.name;
      returnValue.stakeId = result.stakeId;
      returnValue.regionId = result.regionId;
      returnValue.stakeName = result.stake.name;
      returnValue.regionName = result.region.name;
      
    
      setHeaders(res,contentJson)
      res.status(200).json(returnValue);
    }
  

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};

const add_one = async (req, res) => {
  try {
    
      const { id } = req.params;
      const ward = Ward(req.body);
      ward.wardId= await getNewWardId();
      
      await ward
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(404).json({ error }));

      return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};

const update_one = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedWard = req.body;
      Ward
        .updateOne({ wardId: { $eq: id } },
          updatedWard,
          { runValidators: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Ward not updated" }));

      return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};

const delete_one = async (req, res) => {
  try {
    const { id, regionId } = req.params;
      
      let result = {};
            
      try {
          //get user data from model
          result = await Ward.deleteOne({ 'wardId': id , 'regionId': regionId});
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



    

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};






module.exports = { getall, getSingle, add_one, update_one, delete_one, getAllByStake }


