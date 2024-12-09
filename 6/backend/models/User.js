const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String }  // For storing image file name
});

const User = mongoose.model('User', userSchema);
module.exports = User;
