const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize Firebase (this will happen when firebase-config is imported)
const { admin, db } = require('./firebase-config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Routes
const contactRoutes = require('./routes/contact');
const customizeRoutes = require('./routes/customize');

app.use('/api/contact', contactRoutes);
app.use('/api/customize', customizeRoutes);

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'service.html'));
});

app.get('/business', (req, res) => {
  res.sendFile(path.join(__dirname, 'business.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Shri Krishna Leela Enterprises API is running',
    timestamp: new Date().toISOString(),
    firebase: 'Connected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Shri Krishna Leela Enterprises server running on http://localhost:${PORT}`);
  
  try {
    if (admin.apps.length > 0) {
      const app = admin.app();
      const projectId = app.options.projectId || process.env.FIREBASE_PROJECT_ID;
      console.log(`📱 Firebase connected to project: ${projectId}`);
    } else {
      console.log(`📱 Using mock database (Firebase not configured)`);
    }
  } catch (error) {
    console.log(`📱 Using mock database (Firebase not configured)`);
    console.log(`   Error: ${error.message}`);
  }
  
  console.log(`📄 Serving static files from: ${__dirname}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
});