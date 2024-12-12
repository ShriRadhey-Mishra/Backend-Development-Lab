const express = require('express');
const fetch = require('node-fetch'); // Install using `npm install node-fetch`
require('dotenv').config();

const app = express();
const PORT = 3000;

// Replace with your WeatherAPI key
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'b7d0132a74e3434fb5293105242409';

app.use(express.static('public')); // Serves static files (frontend)

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        res.json({
            temp_c: data.current.temp_c,
            condition: data.current.condition.text,
        });
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: 'Weather data not available' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
