'use strict';

var express = require('express');
var path = require('path');
var app = express();
app.use(require('morgan')('combined'));

app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
