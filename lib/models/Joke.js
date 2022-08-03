const pool = require('../utils/pool');

module.exports = class Joke {
  id;
  type;
  question;
  punchLine;

  constructor(row) {
    console.log(row);
    this.id = row.id;
    this.type = row.type;
    this.question = row.question;
    this.punchLine = row.punch_line;
  }

  static async insert({ type, question, punchLine }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
    jokes (type, question, punch_line)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [type, question, punchLine]
    );

    return new Joke(rows[0]);
  }

  static async getAllJokes() {
    const { rows } = await pool.query(`
    SELECT *
    FROM jokes
    `);

    return rows.map((row) => new Joke(row));
  }

  static async updateJokeById(id, { type, question, punchLine }) {
    const { rows } = await pool.query(
      `
      UPDATE jokes
      SET type=$1, question=$2, punch_line=$3
      WHERE id=$4
      RETURNING *
    `,
      [type, question, punchLine, id]
    );

    return new Joke(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM jokes
      WHERE id=$1
    `,
      [id]
    );

    if (!rows[0]) return undefined;

    return new Joke(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE
    FROM jokes
    WHERE id=$1
    RETURNING *
    `,
      [id]
    );

    return new Joke(rows[0]);
  }
};
