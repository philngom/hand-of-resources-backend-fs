const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Joke = require('../lib/models/Joke');

describe('hand-of-resources-backend-fr routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('should add a joke to the db', async () => {

    const res = await request(app)
      .post('/api/v1/jokes')
      .send({ type: 'clean', question: 'Why should you not marry a tennis player', punchLine: 'Because Love means nothing to them' });

    const expected = {
      id: expect.any(String),
      type: 'clean',
      question: 'Why should you not marry a tennis player',
      punchLine: 'Because Love means nothing to them'
    };
    expect(res.body).toEqual(expected);
  });

  test('should get a joke by id', async () => {
    const joke = await Joke.insert(
      {
        type: 'clean',
        question: 'Why should you not marry a tennis player',
        punchLine: 'Because Love means nothing to them'
      }
    );

    const res = await request(app)
      .get(`/api/v1/jokes/${joke.id}`);

    const expected = {
      id: expect.any(String),
      type: 'clean',
      question: 'Why should you not marry a tennis player',
      punchLine: 'Because Love means nothing to them'
    };

    expect(res.body).toEqual(expected);
  });

});
