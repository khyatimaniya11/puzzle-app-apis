const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    }
});

const USER = mongoose.model('user', UserSchema);

module.exports = USER
