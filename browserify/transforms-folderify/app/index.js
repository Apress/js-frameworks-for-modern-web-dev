'use strict';

var $ = require('jquery');
var includeFolder = require('include-folder');
var folder = includeFolder(__dirname + '/templates');

for (var k in folder) {
    $('#container').append('<p>' + k + ': ' + folder[k] + '</p>');
}
