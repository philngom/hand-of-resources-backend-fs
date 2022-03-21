const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

describe('Cars routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should add a car to the db', async () => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({
        year: 2012,
        make: 'Chevy',
        model: 'Malibu'
      });

    const expected = {
      id: expect.any(String),
      year: JSON.stringify(2012),
      make: 'Chevy',
      model: 'Malibu'
    };
    expect(res.body).toEqual(expected);
  });

  test('should get all cars in db', async () => {

    await Car.insert({
      year: 2012,
      make: 'Chevy',
      model: 'Malibu'
    });

    const res = await request(app).get('/api/v1/cars');

    const expected = [{
      id: expect.any(String),
      year: JSON.stringify(2012),
      make: 'Chevy',
      model: 'Malibu'
    }];

    expect(res.body).toEqual(expected);
  });

  test('should get a car by its id', async () => {

    const car = await Car.insert({
      year: 2012,
      make: 'Chevy',
      model: 'Malibu'
    });

    const res = await request(app).get(`/api/v1/cars/${car.id}`);

    const expected = {
      id: expect.any(String),
      year: JSON.stringify(2012),
      make: 'Chevy',
      model: 'Malibu'
    };

    expect(res.body).toEqual(expected);
  });

  test('should update a movie by its id', async () => {
    const car = await Car.insert({
      year: 2012,
      make: 'Chevy',
      model: 'Malibu'
    });

    const res = await request(app)
      .patch(`/api/v1/cars/${car.id}`)
      .send({
        year: 2010,
        make: 'Dodge',
        model: 'Challenger'
      });

    const expected = ({
      id: expect.any(String),
      year: JSON.stringify(2010),
      make: 'Dodge',
      model: 'Challenger'
    });

    expect(res.body).toEqual(expected);
  });

  test('should delete a car by its id', async () => {
    const car = await Car.insert({
      year: 2010,
      make: 'Dodge',
      model: 'Challenger'
    });

    const res = await request(app)
      .delete(`/api/v1/cars/${car.id}`);

    const expected = ({
      id: expect.any(String),
      year: JSON.stringify(2010),
      make: 'Dodge',
      model: 'Challenger'
    });

    expect(res.body).toEqual(expected);
    expect(await Car.getCar(car.id)).toBeNull();
  });
});
