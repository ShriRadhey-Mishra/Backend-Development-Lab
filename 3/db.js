const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todos')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const itemSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item; // Export the model
