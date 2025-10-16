# Shri Krishna Leela Enterprises - Setup Guide

## Firebase Setup Instructions

1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or "Add project"
   - Enter project name (e.g., "shri-krishna-leela-enterprises")
   - Enable Google Analytics (optional)
   - Create project

2. **Enable Firestore Database:**
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in production mode" or "Start in test mode"
   - Select a location closest to your users

3. **Generate Service Account Key:**
   - Go to Project Settings (gear icon) > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Copy the values to your `.env` file

4. **Update .env file:**
   ```
   FIREBASE_PROJECT_ID=your-actual-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-actual-private-key\n-----END PRIVATE KEY-----\n"
   PORT=3000
   ```

## Installation & Running

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Start Production Server:**
   ```bash
   npm start
   ```

## API Endpoints

- `GET /` - Home page
- `GET /about` - About page
- `GET /services` - Services page
- `GET /business` - Business page
- `GET /api/health` - Health check
- `GET /api/contact` - Get contact information
- `POST /api/customize` - Submit client idea
- `GET /api/customize` - Get all client ideas (admin)
- `GET /api/customize/:id` - Get specific client idea
- `DELETE /api/customize/:id` - Delete client idea

## Project Structure

```
├── models/
│   └── ClientIdea.js          # Firebase Firestore model
├── routes/
│   ├── contact.js             # Contact API routes
│   └── customize.js           # Client ideas API routes
├── firebase-config.js         # Firebase initialization
├── index.js                   # Main server file
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables
└── *.html                     # Static HTML files
```

## Testing the Application

1. **Test Health Check:**
   ```
   GET http://localhost:3000/api/health
   ```

2. **Test Contact Info:**
   ```
   GET http://localhost:3000/api/contact
   ```

3. **Submit Client Idea:**
   ```
   POST http://localhost:3000/api/customize
   Content-Type: application/json
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "1234567890",
     "idea": "I want a modern kitchen design"
   }
   ```

## Security Notes

- Never commit `.env` file to version control
- Use proper Firebase security rules in production
- Consider implementing authentication for admin endpoints
- Validate and sanitize all user inputs