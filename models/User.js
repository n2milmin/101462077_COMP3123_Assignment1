const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {type: ObjectId},
    username: { type: String, required: true, index: {unique: true}},
    email: { type: String, required: true},
    password: { type: String, required: true}, //hashed 
    created_at: { type: Date, required: true},
    updated_at: { type: Date, required: fasle}
});

module.exports = mongoose.model("User", userSchema)