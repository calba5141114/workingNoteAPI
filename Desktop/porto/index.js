const Express = require('express');
const App = Express();
const Router = require('./routes/indexRoutes.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://rooter:ZuccIsMoot1@ds253889.mlab.com:53889/palyhacks',{useNewUrlParser: true});

App.use('/', Router);

App.listen(process.env.PORT || 3000, ()=>{
    console.log("Server Successfully Started")
});