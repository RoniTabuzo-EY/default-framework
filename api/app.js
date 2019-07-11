'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const log = require('npmlog-ts');
const router = express.Router();
const Config = require('./config/api_config');
Config.setEnv(process.env.NODE_ENV);
const api = require('./routes');


const PORT = process.env.PORT || 3002;
app.use(bodyParser.json());


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

let mongoDBURI = Config.getProps().mongodb;
console.log('mongodb:', mongoDBURI);
mongoose.connect(mongoDBURI);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => {
    log.info('Mongoose default connection open to ' + mongoDBURI);
});

app.use(function(req, res, next) {
    //config = config.node1RPC;

    req.db = db;

    console.log('here >>>>')
    next();
});

api.init(router);
app.use("/", router);

//handle bad calls
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

//handle unhandled promise rejects
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
})

app.listen(PORT, () => {
    console.log(`api services running on port: ${PORT}`);
});