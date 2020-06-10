'use strict';

var request = require('request');

if (!process.env.WEATHER_API_URL) {
    throw new Error('The `WEATHER_API_URL` environment variable must be set.');
}

setInterval(function() {

    request({
        'url': process.env.WEATHER_API_URL + '/api/weather/37204',
        'json': true,
        'method': 'GET'
    }, function(err, res, result) {
        if (err) throw new Error(err);
        console.log('The temperature is: %s', result.temperature.fahrenheit);
    });

}, 2000);
