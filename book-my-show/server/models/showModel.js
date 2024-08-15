/**
 * name, theatre, date, time, bookedTickets, availableTickets, price
 */

const mongoose = require("mongoose");
const showSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Array,
      default: [],
    },
    theatre: {
      type: mongoose.Types.ObjectId,
      ref: "theatres",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shows", showSchema);
