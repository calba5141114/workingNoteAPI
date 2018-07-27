const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "You need a username!"],
        max: [30, "No more than 30 characters for your username."],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "You need an email."]
    },
    password: {
        type: String,
        required: [true, "No password? smh...."],
    },
    name: {
        type: String,
        max: [30, "No more than 30 characters in your name at least not for us."],
    },
    age: Number,
    userCreated: {
        type: Date,
        default: Date.now(),
    },
    bio: {
        type: String,
        default: "none",
        max: [200, "Your bio can not exceed 200 characters!"]
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;