const pool = require('../utils/pool');

module.exports = class Album {
  id;
  artist;
  albumName;
  producer;

  constructor(row) {
    this.id = row.id;
    this.artist = row.artist;
    this.albumName = row.album_name;
    this.producer = row.producer;
  }

  static async insert({ artist, albumName, producer }) {
    const { rows } = await pool.query(`
    INSERT INTO
    albums (artist, album_name, producer)
    VALUES ($1, $2, $3)
    `, [artist, albumName, producer]);

    return new Album(rows[0]);
  }
};
