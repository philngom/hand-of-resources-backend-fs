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
    albums (artist,
     album_name, producer)
    VALUES ($1, $2, $3)
    RETURNING *`, [artist, albumName, producer]);

    return new Album(rows[0]);
  }

  static async getAlbum(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM albums
    WHERE id=$1`, [id]);

    if (!rows[0]) return null;

    return new Album(rows[0]);
  }

  static async getAllAlbums() {
    const { rows } = await pool.query(`
    SELECT *
    FROM albums`);

    return new Album(rows[0]);
  }

  static async updateAlbum(id, { albumName, producer }) {
    const { rows } = await pool.query(`
    UPDATE albums
    SET album_name=$1, producer=$2
    WHERE id=$3
    RETURNING *`,
    [albumName, producer, id]);

    return new Album(rows[0]);
  }

  static async deleteAlbum(id) {
    const { rows } = await pool.query(`
    DELETE
    FROM albums
    WHERE id=$1
    RETURNING *`,
    [id]);

    return new Album(rows[0]);
  }
};
