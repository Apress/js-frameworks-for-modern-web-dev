'use strict';

var confit = require('confit');
var handlers = require('shortstop-handlers');
var path = require('path');
var basedir = path.join(__dirname, 'config');
var prettyjson = require('prettyjson');

confit({
    'basedir': basedir,
    'protocols': {
        // The `file` handler allows us to set a property's value to the contents
        // of an external (non-JSON) file. By default, the contents of the file
        // will be loaded as a Buffer.
        'file': handlers.file(basedir /* Folder from which paths should be resolved */, {
            'encoding': 'utf8' // Convert Buffers to UTF-8 strings
        }),
        // The `require` handler allows us to set a property's value to that
        // exported from a module.
        'require': handlers.require(basedir),
        // The `glob` handler allows us to set a property's value to an array
        // containing files whose names match a specified pattern
        'glob': handlers.glob(basedir),
        // The `path` handler allows us to resolve relative file paths
        'path': handlers.path(basedir)
    }
}).create(function(err, config) {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log(prettyjson.render({
        'app': config.get('app'),
        'something_else': config.get('something_else'),
        'ssl': config.get('ssl'),
        'email': config.get('email'),
        'images': config.get('images')
    }));
});
