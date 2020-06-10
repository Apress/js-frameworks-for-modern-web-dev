'use strict';
/* global app */

var fs = require('fs');

app.directive('navbar', function() {

    return {
        'restrict': 'E',
        'replace': true,
        'template': fs.readFileSync(__dirname + '/templates/main.html', 'utf8'),
        'scope': {},
        'controller': require('./controller')
    };

});
