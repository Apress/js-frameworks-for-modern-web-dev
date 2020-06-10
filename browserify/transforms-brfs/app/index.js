'use strict';

var fs = require('fs');
var $ = require('jquery');
var tpl = fs.readFileSync(__dirname + '/templates/lorem.html', 'utf8');
$('#container').html(tpl);
