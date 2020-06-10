'use strict';

var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

app.get('/', function(req, res, next) {
    res.send('Hello, world.\n');
});

setInterval(function() {
    throw new Error('Uh oh.');
}, 4000);

app.listen(8000);

console.log('App is listening on port: 8000');
