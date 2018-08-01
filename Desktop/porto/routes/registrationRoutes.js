const express = require('express');
const regRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.js');

/***
 * We are importing jwt in order to tokenize our API (in the future)
 * We imported bcrypt to hash appropriate user info on initialization (Only the passwords so far)
 * config.js holds a secret for use with our API
 * User is a Data model that we use to save users to our Database.
 */


// We are allowing the API to access Developer POST and GET request data.
regRouter.use(bodyParser.json());
regRouter.use(bodyParser.urlencoded({
    extended: true,
}));


/**
 * @param {*} req - the new users data is held within this request object.
 */
function saveNewUser(req) {

    // bcrypt hashes the user request objects data password.
    let hashedPassword = bcrypt.hashSync(req.query.password, 8);

    // Turns the request object from a POST request into a User object.
    let user = new User({
        username: req.query.username,
        email: req.query.email,
        password: hashedPassword,
        name: req.query.name,
        age: req.query.age,
        bio: req.query.bio,
    });

    // Saving the user object created above into the Mongo Database.
    user.save((err, user) => {
        if (err) return console.log(err);
        console.log(user + '\n Successfully saved');
    });

}


//   This route redirects developers on how to use the /signup endpoint.
regRouter.get('/signup', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log('get /signup');
    res.send({
        title: "You are sending a GET request to /signup",
        resolution: "POST new userData at /signup"
    });
});


/**
 * This post /signup method allows users to 
 * send potential user data to this API
 * where it is processed using the saveNewUser function.
 */
regRouter.post('/signup', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    try {
        saveNewUser(req);
        res.send("Successfully saved User!");
    } catch (error) {
        console.log(error);
    }

});

// We exporting this Express Router for use in Index.js.
module.exports = regRouter;