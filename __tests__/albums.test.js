const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Album = require('../lib/models/Album');

describe('Album routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should add an album to the db', async () => {
    const res = await request(app)
      .post('/api/v1/albums')
      .send({
        artist: 'Adele',
        albumName: '30',
        producer: 'Greg Kurstin'
      });

    const expected = {
      id: expect.any(String),
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    };

    expect(res.body).toEqual(expected);
  });

});
