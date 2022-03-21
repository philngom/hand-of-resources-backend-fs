const { Router } = require('express');
const Player = require('../models/Player');

module.exports = Router()
  .post('/', async (req, res) => {
    const player = await Player.insert(req.body);
    res.send(player);
  })

  .get('/:id', async (req, res) => {
    const player = await Player.getPlayer(req.params.id);

    res.send(player);
  });
