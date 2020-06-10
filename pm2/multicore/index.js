'use strict';

if (!process.env.port) throw new Error('The `port` environment variable must be set');

var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

app.route('/')
    .get(function(req, res, next) {
        res.send('Hello, world.');
    });

app.listen(process.env.port);
