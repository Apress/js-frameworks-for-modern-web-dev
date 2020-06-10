'use strict';

if (!process.env.port) throw new Error('The `port` environment variable must be set');

var server;
var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

app.route('/')
    .get(function(req, res, next) {
		res.send('Hello, world.');
    });

process.on('message', function(msg) {
    switch (msg) {
        case 'shutdown':
			server.close();
        break;
    }
});

server = app.listen(process.env.port, function() {
    console.log('App is listening on port: %s', process.env.port);
});
