const Connections = require("./connection");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));
app.set('view engine', 'pug');

Connections.buildConnections();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

module.exports = app;
