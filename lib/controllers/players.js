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
  })

  .get('/', async (req, res) => {
    const player = await Player.getAllPlayers();

    res.send(player);
  })

  .patch('/:id', async (req, res) => {
    const player = await Player.updatePlayer(req.params.id, req.body);

    res.send(player);
  })

  .delete('/:id', async (req, res) => {
    const player = await Player.deletePlayer(req.params.id);

    res.send(player);
  });
