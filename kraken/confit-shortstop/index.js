'use strict';

var confit = require('confit');
var path = require('path');
var basedir = path.join(__dirname, 'config');
var prettyjson = require('prettyjson');

confit(basedir).create(function(err, config) {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log(prettyjson.render({
        'app': config.get('app'),
        'something_else': config.get('something_else')
    }));
});
