const express = require("express");
const router = express.Router();

const movieDal = require("../controllers/movies.dal");

router.get("/api/detailsMovies", async (req, res) => {
  try {
    let details;
    if (!req.query.name) {
      details = await movieDal.getMenuMovieDetailsFromDb();
    } else {
      details = await movieDal.getMenuMovieDetailsFromDbBySearch(
        req.query.name
      );
    }

    if (details.rowCount === 0) {
      res.status(404).json({ ERROR: "No data was found." });
      if (DEBUG) console.log("DEBUGGER: No data was found.");
    }

    res.json(details.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ERROR: "/auth/api/detailsMovies failed to data." });
  }
});

router.get("/api/detailsMovies/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const details = await movieDal.getMenuMovieDetailsFromDbById(req.params.id);

    if (details.rowCount === 0) {
      res.status(404).json({ ERROR: "No data was found." });
      if (DEBUG) console.log("DEBUGGER: No data was found.");
    }

    res.json(details.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ERROR: "/auth/api/detailsMovies failed to data." });
  }
});

router.get("/api/poster_path", async (req, res) => {
  try {
    const posters = await movieDal.getPosterFromDb();

    if (posters.rowCount === 0) {
      res.status(404).json({ ERROR: "No data was found." });
      if (DEBUG) console.log("DEBUGGER: No data was found.");
    }

    res.json({ poster: posters.rows, rowCount: posters.rowCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ERROR: "/auth/api/poster_path failed to data." });
  }
});

router.get("/api/top_movies", async (req, res) => {
  try {
    const movies = await movieDal.getTopMoviesFromDb();

    if (movies.rowCount === 0) {
      res.status(404).json({ ERROR: "No data was found." });
      if (DEBUG) console.log("DEBUGGER: No data was found.");
    }

    res.json(movies.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ERROR: "/auth/api/top_movies failed to data." });
  }
});

router.get("/api/movies_by_genre", async (req, res) => {
  try {
    const movies = await movieDal.getSpecificMoviesByGenreFromDb(
      req.query.genre
    );

    if (movies.rowCount === 0) {
      res.status(404).json({ ERROR: "No data was found." });
      if (DEBUG) console.log("DEBUGGER: No data was found.");
    }

    res.json(movies.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ERROR: "/auth/api/top_movies failed to data." });
  }
});

module.exports = router;
