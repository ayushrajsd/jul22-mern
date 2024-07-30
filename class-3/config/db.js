const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://ayushrajsd:n30kzniwzQFzVjnS@cluster0.bmvb8h3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
