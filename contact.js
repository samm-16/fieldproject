const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import the Mongoose model

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create and save the contact message
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log(`✅ Message saved from ${name} (${email})`);
    res.status(200).json({ success: true, msg: 'Message received and saved' });
  } catch (err) {
    console.error('❌ Error saving contact:', err.message);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

module.exports = router;
