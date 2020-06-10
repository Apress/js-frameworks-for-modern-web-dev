'use strict';

var express = require('express');
var adaro = require('adaro');
var app = express();
var morgan = require('morgan');
var _ = require('lodash');
app.use(morgan('combined'));

app.engine('dust', adaro.dust());

app.set('view engine', 'dust');
app.use('/', express.static('./public'));

app.all('/', function(req, res, next) {
    res.render('main', {
        'servers': [
            { 'name': 'Web Server', 'online': true },
            { 'name': 'Database Server', 'online': true },
            { 'name': 'Email Server', 'online': false }
        ],
        'systemStatus': function(chunk, context, bodies, params) {
            return _.filter(this.servers, { 'online': false }).length ? 'Bad': 'Good';
        },
        'isOnline': function(chunk, context, bodies, params) {
            return context.get('online') ? 'Yes' : 'No';
        }
    });
});

app.listen(8000);
console.log('App is now available at: http://localhost:8000');
