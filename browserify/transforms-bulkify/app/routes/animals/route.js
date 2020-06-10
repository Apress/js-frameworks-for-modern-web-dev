'use strict';

var fs = require('fs');

module.exports = {
    'route': '/animals',
    'config': {
        'controller': require('./controller'),
        'template': fs.readFileSync(__dirname + '/template.html', 'utf8'),
        'resolve': {}
    }
};
