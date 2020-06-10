'use strict';

var express = require('express');
var confit = require('confit');
var handlers = require('shortstop-handlers');
var meddleware = require('meddleware');
var path = require('path');
var configDir = path.join(__dirname, 'config');
var app = express();

confit({
    'basedir': configDir,
    'protocols': {
        'path': handlers.path(configDir),
        'require': handlers.require(configDir)
    }
}).create(function(err, config) {
    app.use(meddleware(config.get('middleware')));
    app.listen(7000);
    console.log('App is available at: http://localhost:7000');
});
