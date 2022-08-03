const { Router } = require('express');
const Joke = require('../models/Joke');

module.exports = Router()
  .post('/', async (req, res) => {
    const joke = await Joke.insert(req.body);
    res.send(joke);
  })
  .get('/', async (req, res) => {
    const jokes = await Joke.getAllJokes();
    res.send(jokes);
  });
