const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  director;
  mainCast;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
    this.mainCast = row.main_cast;
  }

  static async insert({ title, director, mainCast }) {
    const { rows } = await pool.query(`
    INSERT INTO
     movies (title, director, main_cast)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, director, mainCast]);
    return new Movie(rows[0]);
  }

  static async getAllMovies() {
    const { rows } = await pool.query(`
    SELECT *
    FROM movies
    `);

    return new Movie(rows[0]);
  }

  static async getSingleMovie(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM movies
    WHERE id=$1`
    , [id]);
    return new Movie(rows[0]);
  }
};
