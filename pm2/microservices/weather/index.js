'use strict';

if (!process.env.PORT) {
    throw new Error('The `PORT` environment variable must bet set.');
}

var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

var random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get('/api/weather/:postal_code', function(req, res, next) {
    var fahr = random(70, 110);
    res.send({
        'temperature': {
            'fahrenheit': fahr,
            'celsius': (fahr - 32) * (5/9)
        }
    });
});

app.listen(process.env.PORT);
