'use strict';

global.APPROOT = __dirname;

var express = require('express');
var app = express();
var adaro = require('adaro');

app.engine('dust', adaro.dust({
    'layout': 'layouts/main'
}));
app.set('view engine', 'dust');

app.use('/', express.static('./public'));

require('./lib/routes')(app);

app.use(function(err, req, res, next) {
    console.log(err.toString());
    res.status(500).send(err.toString());
});

app.listen(7050);

console.log('App is listening at: http://localhost:7050');
