// env
require('dotenv').config();
// const connectionString = process.env.MONGO_CONNECT_STRING;
const port = process.env.HTTP_PORT;

const swaggerUI = require("swagger-ui-express");
const cors = require('cors')
const logger = require('morgan');

// db models
const mongoose = require('./database/connect');
const m2s = require('mongoose-to-swagger');
const userSchema = m2s(require("./models/user").userModel);
const regionSchema = m2s(require("./models/region").regionModel);
const danceSchema = m2s(require("./models/dance").danceModel);
const stakeSchema = m2s(require("./models/stake").stakeModel);


// swagger
let swaggerSpec = require('./swagger-output.json');
swaggerSpec.definitions = {};

swaggerSpec.definitions.user = userSchema; 
swaggerSpec.definitions.region = regionSchema; 
swaggerSpec.definitions.dance = danceSchema;
swaggerSpec.definitions.stake = stakeSchema;
swaggerSpec.definitions.user.example = require("./models/user").userExample;
swaggerSpec.definitions.dance.example = require('./models/dance').danceExample;
swaggerSpec.definitions.region.example = require('./models/region').regionExample;
swaggerSpec.definitions.stake.example = require('./models/stake').stakeExample;

//express
const express = require('express');
const http = require('http');
const https = require('https');
const app = express();

//views
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// attach login/logout/ /callback
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL ,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };

app.use(auth(config));

// logger
app.use(logger('dev'));

//routes
app.use(cors());
app.use(express.json());

// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// const router = require('./routes');
const stakeRoute = require("./routes/stake");
const wardRoute = require("./routes/ward");

app.use("/", stakeRoute);
app.use("/", wardRoute);
app.use('/', require('./routes/index'));
app.use("/", require('./routes/user'));
app.use("/", require("./routes/region"))
app.use('/', require('./routes/dance'));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Credentials', true);
})

//start
const server = app.listen(port, async (res, req) => {
    if (!process.env.JEST_WORKER_ID) {
        console.log(`App listening at ${process.env.BASE_URL}`)
    }
    try {
        const db = await mongoose.getDb();
        if (!process.env.JEST_WORKER_ID) {
            console.log("connected via mongoose to mongo db");
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = { app, server };
