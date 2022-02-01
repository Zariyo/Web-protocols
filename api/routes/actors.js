const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../data.json')

const Actor = require('../models/Actor');

router.get('/', async (req, res) => {
  try {
    const actors = await Actor.find({});
    return res.send({allActors: [...actors]});
  } catch(err) {
    return res.status(500).send({error: err.message})
  }
});


router.post('/reload', async (req, res) => {
  try {
    await Actor.deleteMany()

    await Actor.insertMany(data.actors)
    res.status(200).send(true)
  }
  catch(err) {
    res.status(500).send({error: err.message})
  }

})

router.post('/', async (req, res) => {
  const actor = new Actor({
    name: req.body.name,
    surname: req.body.surname,
    birthDate: req.body.birthDate,
    imageurl: req.body.imageurl
  })

  try {
    const newActor = await actor.save();
    return res.status(201).send(newActor);
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});



router.get('/:id', async (req, res) => {
try {
  const actor = await Actor.findById(req.params.id);
  if (!actor) {
    return res.status(404).send({message: 'actor with this id does not exist'});
  }
  return res.send(actor);
} catch (err) {
  return res.status(500).send({error: err.message});
}
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const actor = new Actor({
    _id: id,
    name: req.body.name,
    surname: req.body.surname,
    birthDate: req.body.birthDate,
    imageurl: req.body.imageurl
  })

  try {
    const actorToUpdate = await Actor.findById(id);
    if (actorToUpdate) {
      const updated = await Actor.updateOne(actorToUpdate, {...req.body})
    }
    const newActor = actor
    return res.send(newActor)
  } catch(err) {
    return res.status(500).send({error: err.message});
  }
});


router.delete('/:id', async (req, res) => {
const id = req.params.id;
try {
  const actor = await Actor.findById(id);
  if (!actor) {
    return res.status(404).send({message: 'unable to delete, actor with this id does not exist'});
  }
  await actor.remove();
  return res.send({message: `Actor with id: ${id} has been deleted`});
} catch(err) {
  res.status(500).send({error: err.message});
}
});


router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const actor = await Actor.findById(id);
    if (!actor) {
      return res.status(404).send({message: 'actor with this id does not exist'});
    }
    const result = await Actor.updateOne(actor, {$set: req.body});
    return res.send({message: `actor with id: ${id} has been updated`});
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = router;