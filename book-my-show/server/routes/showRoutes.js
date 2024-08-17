const router = require("express").Router();

const Show = require("../models/showModel");

// add show

router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show has been added",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/delete-show/:showId", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);
    res.send({
      success: true,
      message: "Show has been deleted",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.put("/update-show", async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "Show has been updated",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-all-shows-by-theatre/:theatreId", async (req, res) => {
  try {
    console.log("shows for theatre", req.params.theatreId);
    const shows = await Show.find({ theatre: req.params.theatreId }).populate(
      "movie"
    );
    console.log("shows", shows);
    res.send({
      success: true,
      data: shows,
      message: "Shows fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-all-theatres-by-movie/:movie/:date", async (req, res) => {
  /**
   * it retireves all shows od the specified movie and date from the database
   * it then filters out unique theatres from the shows and organizes shows under each unique theatre
   * A - [show1, show2, show3]
   * B - [show4, show5, show6]
   * C - [show7, show8, show9]
   * shows - [show1, show2, show3, show4, show5, show6, show7, show8, show9]
   * [A-[show1, show2], B-[show4 show6], C-[ show8, show9]]
   * */

  try {
    const { movie, date } = req.params;
    console.log("movie", movie, "date", date);
    const shows = await Show.find({ movie, date }).populate("theatre");
    console.log("shows", shows);
    const uniqueTheatres = [];
    shows.forEach((show) => {
      const isTheatre = uniqueTheatres.findIndex(
        (theatre) => theatre._id === show.theatre._id
      );
      console.log("isTheatre", isTheatre);
      if (isTheatre < 0) {
        const showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id === show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    console.log("uniqueTheatres", uniqueTheatres);
    res.send({
      success: true,
      data: uniqueTheatres,
      message: "Shows fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-show-by-id/:showId", async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      data: show,
      message: "Show fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
