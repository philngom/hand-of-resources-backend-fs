const { Router } = require('express');
const Album = require('../models/ALbum');

module.exports = Router()
  .post('/api/v1/albums', async (req, res) => {
    const album = await Album.insert(req.body);

    res.send(album);
  });
