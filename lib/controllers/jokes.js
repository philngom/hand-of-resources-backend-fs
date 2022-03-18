const { Router } = require('express');
const Joke = require('../models/Joke');

module.exports = Router()
  .post('/', async (req, res) => {
    const joke = await Joke.insert(req.body);
    res.send(joke);
  })

  .get('/', async (req, res) => {
    const joke = await Joke.getAllJokes();
    res.send(joke);
  })

  .get('/:id', async (req, res) => {
    const joke = await Joke.getSingleJoke(req.params.id);

    res.send(joke);
  })

  .patch('/:id', async (req, res) => {
    const joke = await Joke.updateJoke(req.params.id, req.body);

    res.send(joke);
  })

  .delete('/:id', async (req, res) => {
    const joke = await Joke.deleteJoke(req.params.id);
    res.send(joke);
  });
