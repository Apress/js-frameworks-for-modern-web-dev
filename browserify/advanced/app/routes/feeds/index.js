'use strict';

var fs = require('fs');

module.exports = {
    'route': '/feeds',
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
