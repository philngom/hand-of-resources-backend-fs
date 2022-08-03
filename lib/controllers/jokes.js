const { Router } = require('express');
const Joke = require('../models/Joke');

module.exports = Router()
  .get('/:id', async (req, res) => {
    console.log(req.params.id);
    const joke = await Joke.getById(req.params.id);
    res.send(joke);
  })
  .post('/', async (req, res) => {
    const joke = await Joke.insert(req.body);
    res.send(joke);
  })
  .get('/', async (req, res) => {
    const jokes = await Joke.getAllJokes();
    res.send(jokes);
  })
  .patch('/:id', async (req, res) => {
    const jokes = await Joke.updateJokeById(req.params.id, req.body);
    res.send(jokes);
  })
  .delete('/:id', async (req, res) => {
    const jokes = await Joke.delete(req.params.id);
    res.send(jokes);
  });
