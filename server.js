const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug: Confirm Mongo URI is loaded
console.log('🔍 MONGO_URI:', process.env.MONGO_URI);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Exit if DB fails
});

// Routes
app.use('/api/contact', require(path.join(__dirname, '../routes/contact')));
app.use('/api/customize', require(path.join(__dirname, '../routes/customize')));

// Health check route (useful for Render)
app.get('/', (req, res) => {
  res.send('🌐 Backend is connected to MongoDB Atlas!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});