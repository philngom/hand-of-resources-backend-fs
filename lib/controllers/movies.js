const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert(req.body);
    res.json(movie);
  })

  .get('/', async (req, res) => {
    const movies = await Movie.getAllMovies();

    res.send(movies);
  })

  .get('/:id', async (req, res) => {
    const movie = await Movie.getSingleMovie(req.params.id);
    res.send(movie);

  })

  .patch('/:id', async (req, res) => {
    const movie = await Movie.updateMovie(req.params.id, req.body);

    res.send(movie);
  })

  .delete('/:id', async (req, res) => {
    const movie = await Movie.deleteMovie(req.params.id);

    res.send(movie);
  });
