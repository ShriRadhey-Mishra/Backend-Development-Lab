const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const { logErrors, errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/middleware_routing_db'; // Replace with your actual database name

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(morgan('dev'));  // Logs HTTP requests using Morgan

// Routes
app.use('/api/users', userRoutes);

// Custom Error Handling Middleware
app.use(logErrors);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
