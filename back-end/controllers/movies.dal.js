const dal = require("../model/postgres.db.config");

const getMenuMovieDetailsFromDb = async () => {
  try {
    const sql = `SELECT movie_id, arr.position, arr.item_object as genre, \
    original_title, release_date, popularity FROM movie, \
    jsonb_array_elements(genres) WITH ordinality arr(item_object, position) \
    WHERE position = 1 \
    ORDER BY random() LIMIT 50;`;
    let response = await dal.query(sql);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getMenuMovieDetailsFromDbBySearch = async (search) => {
  try {
    const sql = `SELECT movie_id, arr.position, arr.item_object as genre, \
    original_title, release_date, popularity FROM movie, \
    jsonb_array_elements(genres) WITH ordinality arr(item_object, position) \
    WHERE position = 1 AND original_title ILIKE $1 LIMIT 35;`;
    let response = await dal.query(sql, [`%${search}%`]);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getMenuMovieDetailsFromDbById = async (id) => {
  try {
    const sql = `SELECT movie_id, arr.position, arr.item_object as genre, production_companies, \
    production_countries, original_title, release_date, revenue, runtime, popularity, overview, \
    spoken_languages, tagline FROM movie, jsonb_array_elements(genres) WITH ordinality arr(item_object, position) \
    WHERE position = 1 AND movie_id = $1;`;
    let response = await dal.query(sql, [id]);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getPosterFromDb = async () => {
  try {
    let response = await dal.query(
      `SELECT poster_path FROM movie ORDER BY random() LIMIT 85;`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getTopMoviesFromDb = async () => {
  try {
    let response = await dal.query(
      `SELECT movie_id, original_title FROM "vw_popularMovies" ORDER BY random() LIMIT 25;`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getSpecificMoviesByGenreFromDb = async (genre) => {
  try {
    let response = await dal.query(
      `SELECT * FROM "vw_specificGenre" WHERE genre_name = $1 ORDER BY random() LIMIT 50;`,
      [genre]
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMenuMovieDetailsFromDb,
  getMenuMovieDetailsFromDbBySearch,
  getMenuMovieDetailsFromDbById,
  getPosterFromDb,
  getTopMoviesFromDb,
  getSpecificMoviesByGenreFromDb,
};
