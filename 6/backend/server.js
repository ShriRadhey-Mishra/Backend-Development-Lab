const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const File = require('./models/File'); // Import the File model

dotenv.config();
const app = express();

// Connect to MongoDB
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/file_upload_management_db';

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});
const upload = multer({ storage: storage });

// Routes
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        // Create a new file document
        const newFile = new File({
            fileName: req.file.filename,
            filePath: req.file.path,
        });

        // Save the file document to MongoDB
        await newFile.save();

        res.json({ message: 'File uploaded successfully', filePath: req.file.path });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving file information to database' });
    }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
