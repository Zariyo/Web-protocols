const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../data.json')

const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.send({allMovies: [...movies]});
  } catch(err) {
    return res.status(500).send({error: err.message})
  }
});


router.post('/reload', async (req, res) => {
  try {
    await Movie.deleteMany()

    await Movie.insertMany(data.movies)
    res.status(200).send(true)
  }
  catch(err) {
    res.status(500).send({error: err.message})
  }

})

router.post('/', async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    director: req.body.director,
    scores: req.body.scores,
    imageurl: req.body.imageurl
  })

  try {
    const newMovie = await movie.save();
    return res.status(201).send(newMovie);
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});



router.get('/:id', async (req, res) => {
try {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send({message: 'movie with this id does not exist'});
  }
  return res.send(movie);
} catch (err) {
  return res.status(500).send({error: err.message});
}
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const movie = new Movie({
    _id: id,
    name: req.body.name,
    series: req.body.series,
    releaseDate: req.body.releaseDate,
    architecture: req.body.architecture,
    company: req.body.company,
    aib: req.body.aib,
    model: req.body.model,
    score: req.body.score,
    imageurl: req.body.imageurl,
    rgb: req.body.rgb
  })

  try {
    const movieToUpdate = await Movie.findById(id);
    if (movieToUpdate) {
      const updated = await Movie.updateOne(movieToUpdate, {...req.body})
    }
    const newMovie = movie
    return res.send(newMovie)
  } catch(err) {
    return res.status(500).send({error: err.message});
  }
});


router.delete('/:id', async (req, res) => {
const id = req.params.id;
try {
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).send({message: 'unable to delete, movie with this id does not exist'});
  }
  await movie.remove();
  return res.send({message: `Movie with id: ${id} has been deleted`});
} catch(err) {
  res.status(500).send({error: err.message});
}
});


router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({message: 'movie with this id does not exist'});
    }
    const result = await Movie.updateOne(movie, {$set: req.body});
    return res.send({message: `movie with id: ${id} has been updated`});
  } catch(err) {
    return res.status(400).send({error: err.message});
  }
});

module.exports = router;