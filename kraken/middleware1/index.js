'use strict';

var request = require('request');
var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var rateLimit = require('ratelimit-middleware');
var app = express();

app.use(morgan('combined'));

app.use(cookieParser());

app.use(rateLimit({
    'burst': 10,
    'rate': 0.5,
    'ip': true
}));

app.get('/animals', function(req, res, next) {
    res.send(['squirrels', 'aardvarks', 'zebras', 'emus']);
});

app.listen(7000);

request({
    'url': 'http://localhost:7000/animals',
    'method': 'GET',
    'json': true
}, function(err, res, body) {
    console.log(body);
    process.exit();
});
