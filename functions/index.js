'use strict';
const functions=require('firebase-functions')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const blogRoutes = require('./routes/blog-routes');
var engines = require('consolidate');
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static("static"));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');


app.use('/api', blogRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));


exports.app=functions.https.onRequest(app);
