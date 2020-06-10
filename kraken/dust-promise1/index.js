'use strict';

var Promise = require('bluebird');
var express = require('express');
var adaro = require('adaro');
var app = express();
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.use('/', express.static('./public'));

app.get('/', function(req, res, next) {
    res.render('main', {
        'cars': function(chunk, context, bodies, params) {
            return ['Nissan Maxima', 'Toyota Corolla', 'Volkswagen Jetta'];
        },
        'trucks': function(chunk, context, bodies, params) {
            return new Promise(function(resolve, reject) {
                resolve(['Chevrolet Colorado', 'GMC Canyon', 'Toyota Tacoma']);
            });
        }
    });
});

app.listen(8000);

console.log('App is now available at: http://localhost:8000');
