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
};
