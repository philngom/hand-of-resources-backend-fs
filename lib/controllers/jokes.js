const { Router } = require('express');
const Joke = require('../models/Joke');

module.exports = Router()
  .post('/', async (req, res) => {
    const joke = await Joke.insert(req.body);
    res.send(joke);
  })

  .get('/:id', async (req, res) => {
    const joke = await Joke.getSingleJoke(req.params.id);

    res.send(joke);
  });
