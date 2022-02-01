const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../data.json')

const Log = require('../models/Log')

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find({});
    return res.send({allLogs: [...logs]});
  } catch(err) {
    return res.status(500).send({error: err.message})
  }
});

module.exports = router;