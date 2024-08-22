const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const EmailHelper = require("../utils/emailHelper");

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

userRouter.get("/get-current-user", authMiddleware, async (req, res) => {
  // console.log("headers", req.headers.authorization);
  console.log("handler for get current user");
  const user = await userModel.findById(req.body.userId).select("-password");
  res.send({
    success: true,
    message: "You are authorized to go to the priotected route",
    data: user,
  });
});

const otpGenerator = function () {
  return Math.floor(100000 + Math.random() * 900000); // ranger from 100000 to 999999
};

userRouter.patch("/forgetpassword", async (req, res) => {
  console.log("forget password");
  try {
    if (req.body.email === undefined) {
      return res
        .status(401)
        .json({ status: "failure", message: "Email is required" });
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (user == null) {
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    }
    const otp = otpGenerator(); // 123456
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    await EmailHelper("otp.html", user.email, { name: user.name, otp: otp });
    res
      .status(200)
      .json({ status: "success", message: "OTP sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

userRouter.patch("/resetpassword/:email", async (req, res) => {
  try {
    const resetDetails = req.body;
    if (!req.params.email || !resetDetails.otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    const user = await userModel.findOne({ email: req.params.email });
    if (user == null) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // if otp is expired
    if (Date.now() > user.otpExpiry) {
      return res
        .status(401)
        .json({ success: false, message: "OTP has expired" });
    }
    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = userRouter;
