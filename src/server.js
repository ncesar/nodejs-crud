const express = require('express');
const bodyParser = require('express');//simplifica o request
const mongoose = require('mongoose');
const config = require('./configs');


const app = express();

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false })); //urlencoded extrai dados do form
app.use(bodyParser.json());
require('./routes/ProductRoutes')(app); //routes


mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(config.url, {
    useNewUrlParser: true,
    useFindAndModify: false//depreciado findoneandupdat ee findoneanddelete
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("could not connect to database", err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ 
        "message": "Welcome to backend"
     });
});

app.listen(config.serverPort, () => {
    console.log('Server running on ' + config.serverPort);
})