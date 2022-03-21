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

    if (!rows[0]) return null;

    return new Movie(rows[0]);
  }

  static async updateMovie(id, { title, director, mainCast }) {
    const { rows } = await pool.query(`
    UPDATE movies
    SET
    title=$1,
    director=$2,
    main_cast=$3
    WHERE id=$4
    RETURNING *
    `
    , [title, director, mainCast, id]);
    return new Movie(rows[0]);
  }

  static async deleteMovie(id) {
    const { rows } = await pool.query(`
    DELETE
    FROM movies
    WHERE id=$1
    RETURNING *`,
    [id]);

    return new Movie(rows[0]);
  }
};
