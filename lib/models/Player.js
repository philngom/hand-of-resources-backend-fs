const pool = require('../utils/pool');


module.exports = class Player {
  id;
  playerName;
  age;
  club;

  constructor(row) {
    this.id = row.id;
    this.playerName = row.player_name;
    this.age = row.age;
    this.club = row.club;

  }

  static async insert({ playerName, age, club }) {
    const { rows } = await pool.query(`
    INSERT INTO
    soccer_players (player_name, age, club)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [playerName, age, club]);
    return new Player(rows[0]);
  }

};
