const { default: mongoose } = require('mongoose');
const Ward = require("../models/ward").wardModel;
const contentText = 'text/plain';
const contentJson = 'application/json';
const {getNewWardId} = require('../models/ward');
const { getUserPrivs } = require('../models/user');


const add_one = async (req, res) => {
  try {
    const userPrivs = getUserPrivs(req);
    if (
      (userPrivs.regionAdmin && req.body.wardId == userPrivs.wardId) ||
      process.env.ENV_DEV) {
      const { id } = req.params;
      const ward = Ward(req.body);
      ward.wardId= await getNewWardId();
      console.log(ward.wardId);
      
      await Ward
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(404).json({ error }));

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



const getallbyregion = async (req, res) => {
  try {
    const { id } = req.params;
    await Ward
      .find({'wardId': id})
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
    await Ward
      .findOne({ 'wardId': id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not found" }));

    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



const delete_one = async (req, res) => {
  try {
    const userPrivs = getUserPrivs(req);
    if (
      (userPrivs.regionAdmin && req.body.wardId == userPrivs.wardId) ||
      process.env.ENV_DEV) {
      const { id } = req.params;
      await Ward
      .remove({ 'wardId': id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not deleted" }));

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





const update_one = async (req, res) => {
  try {
    const userPrivs = getUserPrivs(req);
    if (
      (userPrivs.regionAdmin && req.body.wardId == userPrivs.wardId) ||
      process.env.ENV_DEV) {
      const { id } = req.params;
      const updatedWard = req.body;
      Ward
        .updateOne({ wardId: { $eq: id } },
          updatedWard,
          { runValidators: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Ward not updated" }));

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

module.exports = { add_one, getall, getSingle, delete_one, update_one, getallbyregion }


