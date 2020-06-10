'use strict';

var fs = require('fs');

module.exports = {
    'route': '/dashboard',
    'config': {
        'controller': require('./controller'),
        'template': fs.readFileSync(__dirname + '/templates/main.html', 'utf8'),
        'resolve': {
            'feeds': function(Restangular) {
                return Restangular.all('feeds').getList();
            }
        }
    }
};
