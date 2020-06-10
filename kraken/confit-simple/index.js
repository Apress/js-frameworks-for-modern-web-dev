'use strict';

var confit = require('confit');
var prettyjson = require('prettyjson');
var path = require('path');
var basedir = path.join(__dirname, 'config');

confit(basedir).create(function(err, config) {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log(prettyjson.render({
        'email': config.get('email'),
        'cache': config.get('cache'),
        'database': config.get('database')
    }));
});
