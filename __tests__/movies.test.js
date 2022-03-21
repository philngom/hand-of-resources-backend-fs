const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

describe('Movies routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should add a movie to the db', async () => {
    const res = await request(app)
      .post('/api/v1/movies')
      .send({
        title: 'The Rock',
        director: 'Michael Bay',
        mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
      });

    const expected = ({
      id: expect.any(String),
      title: 'The Rock',
      director: 'Michael Bay',
      mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
    });

    expect(res.body).toEqual(expected);
  });

  test('should get all movies', async () => {
    await Movie.insert({
      title: 'The Rock',
      director: 'Michael Bay',
      mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
    });

    const res = await request(app)
      .get('/api/v1/movies');

    const expected = ({
      id: expect.any(String),
      title: 'The Rock',
      director: 'Michael Bay',
      mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
    });

    expect(res.body).toEqual(expected);
  });

  test('should get movie by id', async () => {
    const movie = await Movie.insert({
      title: 'The Rock',
      director: 'Michael Bay',
      mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
    });

    const expected = ({
      id: expect.any(String),
      title: 'The Rock',
      director: 'Michael Bay',
      mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
    });

    const res = await request(app).get(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual(expected);
  });

  test('should update a movie by id', async () => {
    const movie = await Movie.insert({
      title: 'The Rock',
      director: 'Michael Bay',
      mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
    });

    const expected = ({
      id: expect.any(String),
      title: 'Black Crab',
      director: 'Adam Berg',
      mainCast: ['Noomi Rapace', 'David Rencik']
    });

    const res = await request(app).patch(`/api/v1/movies/${movie.id}`)
      .send({
        title: 'Black Crab',
        director: 'Adam Berg',
        mainCast: ['Noomi Rapace', 'David Rencik']
      });

    expect(res.body).toEqual(expected);
  });

  test('should delete a movie by its id', async () => {
    const movie = await Movie.insert({
      title: 'The Rock',
      director: 'Michael Bay',
      mainCast: ['Sean Connery', 'Nicholas Cage', 'Ed Harris']
    });

    const res = await request(app).delete(`/api/v1/movies/${movie.id}`);

    expect(await Movie.getSingleMovie(movie.id)).toBeNull();
    expect(res.body).toEqual(movie);
  });
});
