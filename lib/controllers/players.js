const { Router } = require('express');
const Player = require('../models/Player');

module.exports = Router()
  .post('/', async (req, res) => {
    const player = await Player.insert(req.body);
    res.send(player);
  });
