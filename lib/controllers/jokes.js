const { Router } = require('express');
const Joke = require('../models/Joke');

module.exports = Router()
  .post('/', async (req, res) => {
    const joke = await Joke.insert(req.body);
    console.log(joke);
    res.send(joke);
  });
