const express = require('express');
const router = express.Router();
const ClientIdea = require('../models/ClientIdea');

router.post('/', async (req, res) => {
  try {
    const newIdea = new ClientIdea(req.body);
    await newIdea.save();
    res.status(201).json({ success: true, data: newIdea });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const ideas = await ClientIdea.find();
    res.status(200).json({ success: true, data: ideas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;