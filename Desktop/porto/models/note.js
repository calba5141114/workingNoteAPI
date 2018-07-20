const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    author: String,
    content: String,   
    date: {
        type: Date,
        default: Date.now(),
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;