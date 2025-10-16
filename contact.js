const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // You can save this to DB or send email
    console.log(`Contact from ${name} (${email}): ${message}`);
    res.status(200).json({ success: true, msg: 'Message received' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;