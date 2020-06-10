'use strict';

var express = require('express');
var open = require('open');
var app = express();
app.use(express.static('./public'));
app.listen(7000);
console.log('App is now available at: http://localhost:7000');
open('http://localhost:7000');
module.exports = app;
