const pool = require('../utils/pool');

module.exports = class Car {
  id;
  year;
  make;
  model;

  constructor(row) {
    this.id = row.id,
    this.year = row.year;
    this.make = row.make;
    this.model = row.model;
  }

  static async insert({ year, make, model }) {
    const { rows } = await pool.query(`
    INSERT INTO
    cars (year, make, model)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [year, make, model]);

    return new Car(rows[0]);
  }

  static async getCar(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM cars
    WHERE id=$1`, [id]);

    if (!rows[0]) return null;

    return new Car(rows[0]);
  }

  static async getAllCars() {
    const { rows } = await pool.query(`
    SELECT *
    FROM cars`);

    return rows.map((row) => new Car(row));
  }


  static async updateCar(id, { year, make, model }) {
    const { rows } = await pool.query(`
    UPDATE cars
    SET year=$1, make=$2, model=$3
    WHERE id=$4
    RETURNING *`,
    [year, make, model, id]);

    return new Car(rows[0]);
  }

  static async deleteCar(id) {
    const { rows } = await pool.query(`
    DELETE
    FROM cars
    WHERE id=$1
    RETURNING *`, [id]);

    return new Car(rows[0]);
  }
};
