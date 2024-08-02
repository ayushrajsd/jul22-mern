const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  roles: {
    type: String,
    enum: ["admin", "user", "partner"],
    required: true,
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
