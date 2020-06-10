'use strict';

var path = require('path');
var express = require('express');
var app = express();

GLOBAL.APPROOT = path.resolve(path.join(__dirname, '../'));

app.use('/', express.static(path.join(APPROOT, 'public')));

module.exports = app;
