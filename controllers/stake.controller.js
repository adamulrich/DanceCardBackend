const { default: mongoose } = require('mongoose');
const Stake = require("../models/stake").stakeModel;
const contentText = 'text/plain';
const contentJson = 'application/json';
const { setHeaders } = require('./utils');


const add_one = async (req, res) => {
  try {
    
      const { id } = req.params;
      const stake = Stake(req.body);
      stake.stakeId=getNewStakeId();
      await stake
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(404).json({ message: "Stake not updated" }));

      return;

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
    await Stake
      .findOne({ 'stakeId': id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not found" }));

    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



const delete_one = async (req, res) => {
  try {
      const { id } = req.params;
      await Stake
      .remove({ 'stakeId': id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not deleted" }));

      return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};





const update_one = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedStake = req.body;
      Stake
        .updateOne({ stakeId: { $eq: id } },
          updatedStake,
          { runValidators: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Stake not updated" }));

      return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};

module.exports = { add_one, getall, getSingle, getallbyregion, delete_one, update_one }


