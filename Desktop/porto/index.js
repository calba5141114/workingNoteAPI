const express = require('express');
const app = express();
const router = require('./routes/indexRoutes.js');
const regRouter = require('./routes/registrationRoutes.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://rooter:ZuccIsMoot1@ds253889.mlab.com:53889/palyhacks', {
    useNewUrlParser: true
});

//handles non auth features.
app.use('/', router);

//handles user registration.
app.use('/', regRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Successfully Started")
});