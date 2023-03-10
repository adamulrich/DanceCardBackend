
const wardSchema = require("../models/ward");


exports.add_one = async (req, res) => {
  try {
    const ward = wardSchema(req.body);
    await ward
      .save()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not added" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



exports.getall = async (req, res) => {
  try {
    await wardSchema
      .find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not found" }));
    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};



exports.getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    await wardSchema
      .findById(id)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not found" }));

    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};





exports.delete_one = async (req, res) => {
  try {
    const { id } = req.params;
    await wardSchema
      .remove({ _id: id })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not deleted" }));

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
    wardSchema
      .updateOne({ _id: id }, { $set: { name, age, email } })
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).json({ message: "Ward not updated" }));

    return;

  } catch (error) {
    //500 server error
    res.status(500).json({ message: error.message });
  }
};


