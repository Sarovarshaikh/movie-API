const express = require("express");
const router = express.Router();
const Movie = require("../models/movies.model");

/**
 * this route is created new entry in db
 */
router.post("/create", async (req, res) => {
  const { name, img, summary } = req.body;
  if (!name || !img || !summary) {
    return res.status(400).json({ msg: "Fields required!" });
  }
  try {
    const createMovieData = new Movie({ name, img, summary });
    await createMovieData.save();
    res
      .status(200)
      .json({ msg: "Data created successfully!", data: createMovieData });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create movie list!" });
  }
});

/**
 * this route is  fetched all movie data from db
 */
router.get("/movie-list", async (req, res) => {
  try {
    const moviesData = await Movie.find();
    res.status(200).json(moviesData);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetched data movie list!" });
  }
});

/**
 * this route is fetch movie details by movie id
 */
router.get("/movie-details/:id", async (req, res) => {
  const movieId = req.params.id;
  if (!movieId) {
    return res.status(400).json({ msg: "Movie id is not found!" });
  }
  try {
    const moviesDetails = await Movie.findById(movieId);
    res.status(200).json(moviesDetails);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetched data movie details!" });
  }
});

/**
 * this route is update  movie details by movie id
 */
router.put("/movie-update/:id", async (req, res) => {
  const movieId = req.params.id;
  const { name, img, summary } = req.body;
  if (!movieId) {
    return res.status(400).json({ msg: "Movie id is not found!" });
  }

  if (!name || !img || !summary) {
    return res.status(400).json({ msg: "Fields required!" });
  }
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { name, img, summary },
      { new: true }
    );
    if (!updatedMovie) return res.status(404).json({ msg: "Movie not found" });

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ msg: "Failed to updated data movie !" });
  }
});

/**
 * this route is delete movie details by movie id
 */
router.delete("/movie-delete/:id", async (req, res) => {
  const movieId = req.params.id;
  if (!movieId) {
    return res.status(400).json({ msg: "Movie id is not found!" });
  }
  try {
    const moviesDelete = await Movie.findOneAndDelete({ _id: movieId });

    if (!moviesDelete) return res.status(404).json({ msg: "Movie not found" });

    res.status(200).json({ msg: "Data deleted successfully!", moviesDelete });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete data from db details!" });
  }
});

module.exports = router;
