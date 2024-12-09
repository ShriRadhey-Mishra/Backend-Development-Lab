const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(cors());  

app.use(express.json());

const dbURI = 'mongodb://localhost:27017/your_db_name';
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
