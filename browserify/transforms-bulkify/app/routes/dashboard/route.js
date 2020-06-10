'use strict';

var fs = require('fs');

module.exports = {
    'route': '/dashboard',
    'config': {
        'controller': require('./controller'),
        'template': fs.readFileSync(__dirname + '/template.html', 'utf8'),
        'resolve': {}
    }
};
