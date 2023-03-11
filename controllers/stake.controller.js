
const stakeSchema = require("../models/stake");

exports.add_one = async (req, res) => {
  try {
    const stake = stakeSchema(req.body);
    await stake
      .save()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not added" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



exports.getall = async (req, res) => {
  try {
    await stakeSchema
      .find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not found" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



exports.getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    await stakeSchema
      .findById(id)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not found" }));

    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};





exports.delete_one = async (req, res) => {
  try {
    const { id } = req.params;
    await stakeSchema
      .remove({ _id: id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not deleted" }));

    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};





exports.update_one = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    stakeSchema
      .updateOne({ _id: id }, { $set: { name, age, email } })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Stake not updated" }));

    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};


