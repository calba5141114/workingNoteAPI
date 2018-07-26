const express = require('express');
const app = express();
const router = require('./routes/indexRoutes.js');
const regRouter = require('./routes/registrationRoutes.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://rooter:ZuccIsMoot1@ds253889.mlab.com:53889/palyhacks', {
    useNewUrlParser: true
});

app.use('/', router);
app.use('/',regRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Successfully Started")
});

