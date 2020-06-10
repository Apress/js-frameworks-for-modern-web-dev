'use strict';

global.APPROOT = __dirname;

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var adaro = require('adaro');
var sessionStore = require('./lib/knex/session');

app.engine('dust', adaro.dust({
    'layout': 'layouts/main'
}));
app.set('view engine', 'dust');

app.use(bodyParser.urlencoded({
    'extended': true
}));

app.use('/', express.static('./public'));

app.use(session({
    'secret': 'piMoGJw4x7gLCQ',
    'cookie': {
        'maxAge': 86400000 // 24 hours
    },
    'store': sessionStore,
    'resave': false,
    'saveUninitialized': false
}));

/**
 * Authorize incoming requests
 */
app.use(function(req, res, next) {
    if (req.url === '/' || req.url === '/sessions') return next();
    if (!req.session || !req.session.user_id) return next(new Error('No valid session found'));
    var User = require('./lib/models/user');
    User.where({
        'id': req.session.user_id
    }).fetch({
        'require': true
    }).then(function(user) {
        req.user = user;
        next();
    }).catch(next);
});

require('./lib/routes')(app);

app.use(function(err, req, res, next) {
    console.log(err.toString());
    res.status(500).send(err.toString());
});

app.listen(7000);

console.log('App is listening at: http://localhost:7000');
