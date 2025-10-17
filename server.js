// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Core modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Replace with your Netlify domain for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Stop the server if DB fails
});

// Routes
const contactPath = path.join(__dirname, 'routes', 'contact.js');
const customizePath = path.join(__dirname, 'routes', 'customize.js');

try {
  const contactRoutes = require(contactPath);
  const customizeRoutes = require(customizePath);

  app.use('/api/contact', contactRoutes);
  app.use('/api/customize', customizeRoutes);
} catch (err) {
  console.error('❌ Route loading error:', err.message);
}

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Oddysey Architects backend is live!');
});

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
