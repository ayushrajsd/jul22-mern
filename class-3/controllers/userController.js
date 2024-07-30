const Usermodel = require("../models/userModel");

const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await Usermodel.create({ name, email });
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await Usermodel.findByIdAndUpdate(id, { name, email });
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createUser, updateUserById };
