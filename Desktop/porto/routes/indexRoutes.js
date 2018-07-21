const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
const Note = require('../models/note.js');

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({
    extended: true,
}));


Router.get('/', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.send({
        title: "PortoAPI",
        author: "Carlos A Alba Gutierrez",
        date: "Thursday July 19th 2018",
        versions: "0.1",
    });
});


/**
 * @param {object} req - The POST methods Request Object
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

Router.get('/note', (req, res) => {

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

Router.post('/note', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    try {
        saveNote(req);
        res.send('Success');
    } catch (err) {
        res.send(err);
    }

});

module.exports = Router;