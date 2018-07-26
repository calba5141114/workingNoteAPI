const express = require('express');
const regRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user.js')

/**
 * 
 * @param {*} req - the new users data is held within this request object.
 */
function saveNewUser(req) {

    let user = new User({
        username: req.query.username,
        email: req.query.email,
        password: req.query.password,
        passwordConfirmation: req.query.passwordConfirmation,
        name: req.query.name,
        age: req.query.age,
        bio: req.query.bio,
    });

    user.save((err, user) => {
        if (err) return console.log(err);
        console.log(user + '\n Successfully saved');
    });

}


regRouter.get('/signup',(req,res)=>{
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log('get /signup');
    res.send({
        title:"You are sending a GET request to /signup",
        resolution: "POST new userData at /signup"
    });
});


// takes user information and saves them to the mongoDB
regRouter.post('/signup',(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    try{
        saveNewUser(req);
        res.send("Successfully saved User!");
    }
    catch(error){
        console.log(error);
    }

});

module.exports = regRouter;
