'use strict';

define([], function() {
    return {
        'getForecast': function() {
            document.getElementById('forecast').innerHTML = 'Partly cloudy.';
        }
    };
});
