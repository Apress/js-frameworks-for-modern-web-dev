'use strict';

var Promise = require('bluebird');
var express = require('express');
var adaro = require('adaro');
var app = express();
var engine = adaro.dust();
var dust = engine.dust;
app.engine('dust', engine);
app.set('view engine', 'dust');
app.use('/', express.static('./public'));

app.get('/', function(req, res, next) {
    dust.stream('views/main', {
        'cars': ['Nissan Maxima', 'Toyota Corolla', 'Volkswagen Jetta'],
        'trucks': function(chunk, context, bodies, params) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(['Chevrolet Colorado', 'GMC Canyon', 'Toyota Tacoma']);
                }, 4000);
            });
        }
    }).pipe(res);
});

app.listen(8000);
