const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, index: {unique: true}},
    email: { type: String, required: true},
    password: { type: String, required: true}, //hashed 
    created_at: Date,
    updated_at: { type: Date, default: Date.now()}
});

module.exports = mongoose.model("User", userSchema)