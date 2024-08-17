const Movie = require("../models/movieModel");

const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New movie has been added",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched",
      data: allMovies,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "Movie has been updated",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  console.log("req.body", req.body.movieId);
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    res.send({
      success: true,
      message: "Movie has been deleted",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "movie fetched successfully",
      data: movie,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
};
