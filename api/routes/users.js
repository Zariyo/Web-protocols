const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../data.json')

const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({allUsers: [...users]});
  } catch(err) {
    return res.status(500).send({error: err.message})
  }
});


router.post('/reload', async (req, res) => {
  try {
    await User.deleteMany()

    await User.insertMany(data.users)
    res.status(200).send(true)
  }
  catch(err) {
    res.status(500).send({error: err.message})
  }

})

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    imageurl: req.body.imageurl,
  })

  try {
    const newUser = await user.save();
    return res.status(201).send(newUser);
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});



router.get('/:id', async (req, res) => {
try {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send({message: 'user with this id does not exist'});
  }
  return res.send(user);
} catch (err) {
  return res.status(500).send({error: err.message});
}
});


router.put('/:id', async (req, res) => {
  let id = req.params.id
  const user = new User({
    _id: id,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
    supports: req.body.supports,
    imgurl: req.body.imgurl,
    creationDate: req.body.creationDate
  })

  try {
    const userToUpdate = await User.findById(id);
    if (userToUpdate) {
      const updated = await User.updateOne(userToUpdate, {...req.body})
    }
    const newUser = user
    return res.send(newUser)
  } catch(err) {
    return res.status(500).send({error: err.message});
  }
});


router.delete('/:id', async (req, res) => {
const id = req.params.id;
try {
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({message: 'unable to delete, user with this id does not exist'});
  }
  await user.remove();
  return res.send({message: `User with id: ${id} has been deleted`});
} catch(err) {
  res.status(500).send({error: err.message});
}
});


router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({message: 'user with this id does not exist'});
    }
    const result = await User.updateOne(user, {$set: req.body});
    return res.send({message: `user with id: ${id} has been updated`});
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = router;