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

  static async getPlayer(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM soccer_players
      WHERE id=$1
      `, [id]
    );

    if (!rows[0]) return null;

    return new Player(rows[0]);
  }

  static async getAllPlayers() {
    const { rows } = await pool.query(
      `SELECT *
      FROM soccer_players`
    );

    return new Player(rows[0]);
  }

  static async updatePlayer(id, { age, club }) {
    const { rows } = await pool.query(`
    UPDATE soccer_players
    SET age=$1, club=$2
    WHERE id=$3 RETURNING *`,
    [age, club, id]);

    return new Player(rows[0]);
  }

  static async deletePlayer(id) {
    const { rows } = await pool.query(`
    DELETE
    FROM soccer_players
    WHERE id=$1
    RETURNING *`, [id]);

    return new Player(rows[0]);
  }

};
