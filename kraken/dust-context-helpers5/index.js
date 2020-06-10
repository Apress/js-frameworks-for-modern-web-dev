'use strict';

var express = require('express');
var adaro = require('adaro');
var app = express();
var morgan = require('morgan');
var moment = require('moment');
var _ = require('lodash');
app.use(morgan('combined'));

app.engine('dust', adaro.dust());

app.set('view engine', 'dust');
app.use('/', express.static('./public'));

app.all('/', function(req, res, next) {
    res.render('main', {
        'servers': [
            { 'name': 'Web Server', 'online': true, 'uptime': 722383 },
            { 'name': 'Database Server', 'online': true, 'uptime': 9571 },
            { 'name': 'Email Server', 'online': false, 'uptime': null }
        ],
        'systemStatus': function(chunk, context, bodies, params) {
            return _.filter(this.servers, { 'online': false }).length ? 'Bad': 'Good';
        },
        'formatUptime': function(chunk, context, bodies, params) {
            if (!params.value) return chunk.write('-');
            chunk.write(moment.duration(params.value, 'seconds').humanize());
        }
    });
});

app.listen(8000);
console.log('App is now available at: http://localhost:8000');
