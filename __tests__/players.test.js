const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Player = require('../lib/models/Player');

describe('Player routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should add a player to the db', async () => {
    const res = await request(app)
      .post('/api/v1/players')
      .send({
        playerName: 'Lionel Messi',
        age: 34,
        club: 'Paris Saint-Germain'
      });

    const expected = {
      id: expect.any(String),
      playerName: 'Lionel Messi',
      age: 34,
      club: 'Paris Saint-Germain'
    };

    expect(res.body).toEqual(expected);
  });

});
