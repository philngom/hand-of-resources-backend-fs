const { Router } = require('express');
const Album = require('../models/ALbum');

module.exports = Router()
  .post('/', async (req, res) => {
    const album = await Album.insert(req.body);

    res.send(album);
  })

  .get('/:id', async (req, res) => {
    const album = await Album.getAlbum(req.params.id);

    res.send(album);
  })

  .get('/', async (req, res) => {
    const album = await Album.getAllAlbums();

    res.send(album);
  })

  .patch('/:id', async (req, res) => {
    const album = await Album.updateAlbum(req.params.id, req.body);

    res.send(album);
  })

  .delete('/:id', async (req, res) => {
    const album = await Album.deleteAlbum(req.params.id);

    res.send(album);
  });


