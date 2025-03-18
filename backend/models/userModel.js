const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    address: { type: String },
    phone: { type: Number },
    memberSince: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
