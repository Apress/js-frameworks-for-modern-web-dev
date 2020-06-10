'use strict';

var fs = require('fs');

module.exports = {
    'route': '/login',
    'config': {
        'controller': require('./controller'),
        'template': fs.readFileSync(__dirname + '/templates/main.html', 'utf8'),
        'resolve': {
            'me': null
        }
    }
};
