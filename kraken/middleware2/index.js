'use strict';

var request = require('request');
var express = require('express');
var confit = require('confit');
var meddleware = require('meddleware');
var app = express();
var path = require('path');

confit(path.join(__dirname, 'config')).create(function(err, config) {

    app.use(meddleware(config.get('middleware')));

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

});
