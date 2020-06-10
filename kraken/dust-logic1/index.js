'use strict';

var _ = require('lodash');
_.mixin(require('underscore.string'));
var express = require('express');
var adaro = require('adaro');
var app = express();
app.use(require('morgan')('combined'));

var dust = adaro.dust({
    'helpers': [
        function(dust) {
            dust.filters.humanize = function(value) {
                return _.humanize(value);
            };
            dust.filters.capitalize = function(value) {
                return _.capitalize(value, true);
            };
            dust.filters.titleize = function(value) {
                return _.titleize(value);
            };
            dust.helpers.inRange = function(chunk, context, bodies, params) {
                if (params.key >= params.lower && params.key <= params.upper) {
                    return chunk.render(bodies.block, context);
                } else {
                    return chunk;
                }
            }
        }
    ]
});

app.engine('dust', dust);
app.set('view engine', 'dust');
app.use('/', express.static('./public'));

app.all('/', function(req, res, next) {
    res.render('main', require('./data.json'));
});

app.listen(8000);
console.log('App is now available at: http://localhost:8000');
