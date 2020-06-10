'use strict';

var express = require('express');
var path = require('path');
var app = express();
var animals = require('app/models/animal');
app.use('/', express.static(path.join(__dirname, '..', '..', '..', 'public')));
app.get('/animals', function(req, res, next) {
    res.send(animals);
});
app.listen(7000, function() {
    console.log('App is now available at: http://localhost:7000');
});

module.exports = app;
