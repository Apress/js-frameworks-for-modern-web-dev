'use strict';

var express = require('express');
var adaro = require('adaro');
var app = express();
var moment = require('moment');

app.engine('dust', adaro.dust({
    'cache': false,
    'helpers': [
        function(dust) {
            dust.filters.formatTS = function(ts) {
                return moment(ts, 'X').format('MMM. D, YYYY');
            };
        }
    ]
}));

app.set('view engine', 'dust');
app.use('/', express.static('./public'));

app.get('/', function(req, res, next) {
    res.render('main', {
        'events': [
            { 'label': 'Moon Landing', 'ts': -14558400 },
            { 'label': 'Fall of Berlin Wall', 'ts': 626616000 },
            { 'label': 'First Episode of Who\'s the Boss', 'ts': 464529600 }
        ]
    });
});

app.listen(8000);
console.log('App is now available at: http://localhost:8000');
