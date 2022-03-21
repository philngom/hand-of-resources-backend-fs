const pool = require('../utils/pool');


module.exports = class Joke {
  id;
  type;
  question;
  punchLine;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.question = row.question;
    this.punchLine = row.punch_line;

  }

  static async insert({ type, question, punchLine }) {
    const { rows } = await pool.query(`
    INSERT INTO
    jokes (type, question, punch_line)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [type, question, punchLine]);

    return new Joke(rows[0]);
  }

  static async getSingleJoke(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM jokes
      WHERE id=$1
      `, [id]
    );

    if (!rows[0]) return null;

    return new Joke(rows[0]);
  }

  static async getAllJokes() {
    const { rows } = await pool.query(`
    SELECT
     *
    FROM
     jokes
    `);

    const jokes = rows.map((row) => new Joke(row));
    return jokes;
  }

  static async updateJoke(id, { question, punchLine }) {
    const { rows } = await pool.query(`
    UPDATE jokes
    SET question=$1, punch_line=$2
    WHERE id=$3 RETURNING *`,
    [question, punchLine, id]);

    return new Joke(rows[0]);
  }

  static async deleteJoke(id) {
    const { rows } = await pool.query(`
    DELETE
    FROM jokes
    WHERE id=$1
    RETURNING *`
    , [id]);
    return new Joke(rows[0]);
  }
};
