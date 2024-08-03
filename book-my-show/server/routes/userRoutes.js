const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  // /api/users/register
  try {
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists) {
      // res.status(400).json({ success: false, message: "User already exists" });
      return res.send({ success: false, message: "User already exists" });
    }
    const newUser = new userModel(req.body);
    await newUser.save();

    return res.send({
      success: true,
      message: "User registered successfully, Please login",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log("user", user);
    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
    }
    if (req.body.password !== user.password) {
      return res.send({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = userRouter;
