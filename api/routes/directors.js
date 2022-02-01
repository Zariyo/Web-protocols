const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../data.json')

const Director = require('../models/Director');

router.get('/', async (req, res) => {
  try {
    const directors = await Director.find({});
    return res.send({allDirectors: [...directors]});
  } catch(err) {
    return res.status(500).send({error: err.message})
  }
});


router.post('/reload', async (req, res) => {
  try {
    await Director.deleteMany()

    await Director.insertMany(data.directors)
    res.status(200).send(true)
  }
  catch(err) {
    res.status(500).send({error: err.message})
  }

})

router.post('/', async (req, res) => {
  const director = new Director({
    name: req.body.name,
    surname: req.body.surname,
    birthDate: req.body.birthDate,
    imageurl: req.body.imageurl
  })

  try {
    const newDirector = await director.save();
    return res.status(201).send(newDirector);
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});



router.get('/:id', async (req, res) => {
try {
  const director = await Director.findById(req.params.id);
  if (!director) {
    return res.status(404).send({message: 'director with this id does not exist'});
  }
  return res.send(director);
} catch (err) {
  return res.status(500).send({error: err.message});
}
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const director = new Director({
    _id: id,
    name: req.body.name,
    surname: req.body.surname,
    birthDate: req.body.birthDate,
    imageurl: req.body.imageurl
  })

  try {
    const directorToUpdate = await Director.findById(id);
    if (directorToUpdate) {
      const updated = await Director.updateOne(directorToUpdate, {...req.body})
    }
    const newDirector = director
    return res.send(newDirector)
  } catch(err) {
    return res.status(500).send({error: err.message});
  }
});


router.delete('/:id', async (req, res) => {
const id = req.params.id;
try {
  const director = await Director.findById(id);
  if (!director) {
    return res.status(404).send({message: 'unable to delete, director with this id does not exist'});
  }
  await director.remove();
  return res.send({message: `Director with id: ${id} has been deleted`});
} catch(err) {
  res.status(500).send({error: err.message});
}
});


router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const director = await Director.findById(id);
    if (!director) {
      return res.status(404).send({message: 'director with this id does not exist'});
    }
    const result = await Director.updateOne(director, {$set: req.body});
    return res.send({message: `director with id: ${id} has been updated`});
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = router;