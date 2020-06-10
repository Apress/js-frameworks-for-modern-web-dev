'use strict';

var express = require('express');
var adaro = require('adaro');
var app = express();
var morgan = require('morgan');
app.use(morgan('combined'));
var engine = adaro.dust();
var dust = engine.dust;
app.engine('dust', engine);

app.set('view engine', 'dust');
app.use('/', express.static('./public'));

app.all('/', function(req, res, next) {
    res.render('main', {
        'people': [
            { 'name': 'Joe', 'location': 'Chicago' },
            { 'name': 'Mary', 'location': 'Denver' },
            { 'name': 'Steve', 'location': 'Oahu' },
            { 'name': 'Laura', 'location': 'Nashville' }
        ],
        'parseLocation': function(chunk, context, bodies, params) {
            var content = dust.helpers.tap(params.value, chunk, context);
            return chunk.write(content.toUpperCase());
        }
    });
});

app.listen(8000);
console.log('App is now available at: http://localhost:8000');
