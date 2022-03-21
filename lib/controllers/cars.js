const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  .post('/', async (req, res) => {
    console.log(req.body);
    const car = await Car.insert(req.body);

    res.send(car);
  })

  .get('/', async (req, res) => {
    const car = await Car.getAllCars();

    res.send(car);
  })

  .get('/:id', async (req, res) => {
    const car = await Car.getCar(req.params.id);

    res.send(car);
  })

  .patch('/:id', async (req, res) => {
    const car = await Car.updateCar(req.params.id, req.body);

    res.send(car);
  })

  .delete('/:id', async (req, res) => {
    const car = await Car.deleteCar(req.params.id);

    res.send(car);
  });
