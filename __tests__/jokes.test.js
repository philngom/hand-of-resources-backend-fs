const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Joke = require('../lib/models/Joke');

describe('Jokes routes', () => {
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

  test('should get all jokes', async () => {
    await Joke.insert({
      type: 'clean',
      question: 'Why should you not marry a tennis player',
      punchLine: 'Because Love means nothing to them'
    });

    const expected = [{
      id: expect.any(String),
      type: 'clean',
      question: 'Why should you not marry a tennis player',
      punchLine: 'Because Love means nothing to them'
    }];

    const res = await request(app)
      .get('/api/v1/jokes');

    expect(res.body).toEqual(expected);
  });

  test('should update an existing joke', async () => {
    const joke = await Joke.insert({
      type: 'clean',
      question: 'Why should you not marry a tennis player',
      punchLine: 'Because Love means nothing to them'
    });

    const expected = {
      id: expect.any(String),
      type: 'clean',
      question: 'What two things can you never eat for breakfast?',
      punchLine: 'Lunch and dinner'
    };

    const res = await request(app)
      .patch(`/api/v1/jokes/${joke.id}`)
      .send({
        question: 'What two things can you never eat for breakfast?',
        punchLine: 'Lunch and dinner'
      });

    expect(res.body).toEqual(expected);
    expect(await Joke.getSingleJoke(joke.id)).toEqual(expected);
  });

  test('should delete a joke by id', async () => {
    const joke = await Joke.insert({
      type: 'clean',
      question: 'Why should you not marry a tennis player',
      punchLine: 'Because Love means nothing to them'
    });

    const res = await request(app).delete(`/api/v1/jokes/${joke.id}`);

    expect(res.body).toEqual(joke);
    // expect(await Joke.getSingleJoke(joke.id)).toBeNull();

  });

});
