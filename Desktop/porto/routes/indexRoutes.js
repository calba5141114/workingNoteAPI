const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Note = require('../models/note.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true,
}));

// sends information about the API to the developers.
router.get('/', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.send({
        title: "PortoAPI",
        author: "Carlos A Alba Gutierrez",
        date: "Thursday July 19th 2018",
        lastUpdated:"Thursday July 26 2018",
        versions: "0.2",
    });
});

/**
 * @param {*} req - The POST methods Request Object
 * @description saves to MongoDB
 */
function saveNote(req) {

    let note = new Note({
        title: req.query.title,
        author: req.query.author,
        content: req.query.content,
    });

    note.save((err, note) => {
        if (err) return console.log(err);
        console.log(note + '\n Successfully saved');
    });

}

//  Sends back data from notes collection in mongoDB formatted out as JSON.
router.get('/note', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Note.find({}, (err, notes) => {
        let noteMap = {};
        notes.forEach((note) => {
            noteMap[note._id] = note;
        })
        res.send(noteMap);
    });


});

//allows devs to POST a note data object to the MongoDB.
router.post('/note', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    try {
        saveNote(req);
        res.send('Success');
    } catch (err) {
        res.send(err);
    }

});


module.exports = router;