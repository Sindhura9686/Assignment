
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000; // You can use any available port you prefer

// Enable CORS to allow cross-origin requests from the frontend
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

const pastLocations = []; // Array to store past locations

// Endpoint to fetch restaurants from Google Places API
app.get('/api/restaurants', async (req, res) => {
  // ... (existing code to fetch restaurants)
});

// Endpoint to add past location
app.post('/api/past-locations', (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  // Store the past location in the array
  pastLocations.push({ lat, lng });
  res.sendStatus(201);
});

// Endpoint to fetch past locations
app.get('/api/past-locations', (req, res) => {
  res.json(pastLocations);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
