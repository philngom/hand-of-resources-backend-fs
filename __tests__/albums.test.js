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

  test('should get an album by its id', async () => {

    const album = await Album.insert({
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    });

    const res = await request(app)
      .get(`/api/v1/albums/${album.id}`);

    const expected = {
      id: expect.any(String),
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    };

    expect(res.body).toEqual(expected);

  });

  test('should get all albums', async () => {

    await Album.insert({
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    });

    const res = await request(app)
      .get('/api/v1/albums');

    const expected = {
      id: expect.any(String),
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    };

    expect(res.body).toEqual(expected);

  });

  test('should update an album by id', async () => {

    const album = await Album.insert({
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    });

    const res = await request(app)
      .patch(`/api/v1/albums/${album.id}`)
      .send({
        albumName: 21,
        producer: 'Adele Adkins'
      });

    const expected = {
      id: expect.any(String),
      artist: 'Adele',
      albumName: '21',
      producer: 'Adele Adkins'
    };

    expect(res.body).toEqual(expected);
  });

  test('should delete an album by its id', async () => {
    const album = await Album.insert({
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    });

    const res = await request(app)
      .delete(`/api/v1/albums/${album.id}`);

    const expected = {
      id: expect.any(String),
      artist: 'Adele',
      albumName: '30',
      producer: 'Greg Kurstin'
    };

    expect(res.body).toEqual(expected);
    expect(await Album.getAlbum(album.id)).toBeNull();
  });

});
