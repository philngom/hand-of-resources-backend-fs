const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    console.log(res.body);
    expect(res.body).toEqual(expected);
  });
});
