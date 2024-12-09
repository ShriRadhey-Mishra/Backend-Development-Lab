const express = require('express');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append date to filename
    }
});

const upload = multer({ storage: storage });

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user with image upload
router.post('/', upload.single('profileImage'), async (req, res) => {
    const { name, email, password } = req.body;

    const user = new User({
        name,
        email,
        password,
        profileImage: req.file ? req.file.filename : null // Store filename if uploaded
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
