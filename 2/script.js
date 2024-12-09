const express = require('express');
const Item = require('../3/db'); // Import the Mongoose model from db.js
const app = express();

// Middleware to parse JSON
app.use(express.json());

// GET all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from MongoDB
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items' });
    }
});

// GET a specific item by ID
app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id); // Find the item by ID in MongoDB
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching item' });
    }
});

// POST a new item
app.post('/api/items', async (req, res) => {
    try {
        const newItem = new Item({
            task: req.body.task,
            completed: req.body.completed || false
        });
        const savedItem = await newItem.save(); // Save the new item to MongoDB
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error creating item' });
    }
});

// PUT to update an existing item
app.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
            task: req.body.task,
            completed: req.body.completed
        }, { new: true }); // Update the item in MongoDB
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error updating item' });
    }
});

// DELETE an item by ID
app.delete('/api/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id); // Delete the item from MongoDB
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
