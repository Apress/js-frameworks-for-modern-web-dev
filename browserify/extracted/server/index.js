'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./lib/models/user');
var Feed = require('./lib/models/feed');
var knex = require('./lib/knex');
var app = express();
app.use(require('morgan')('combined'));
var session = require('express-session');
var KnexSessionStore = require('connect-session-knex')(session);
var store = new KnexSessionStore({
    'knex': knex
});

app.use(session({
    'secret': 'keyboard cat',
    'cookie': {
        'httpOnly': true
    },
    'store': store,
    'resave': false,
    'saveUninitialized': true
}));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.use(function(req, res, next) {

    var openRoutes = [
        '/api/v1/sessions'
    ];

    if (openRoutes.indexOf(req.url) >= 0) {
        return next();
    }

    User
        .where({
            'id': req.session.user_id
        })
        .fetch({
            'require': true
        })
        .then(function(user) {
            req.user = user;
            next();
        })
        .catch(next);

});

app.param('feed_id', function(req, res, next, id) {
    Feed
        .where({
            'id': id,
            'user_id': req.user.id
        })
        .fetch({
            'require': true
        })
        .then(function(feed) {
            req.feed = feed;
            next();
        })
        .catch(next);
});

app.param('article_id', function(req, res, next, id) {
    Article
        .where({
            'id': id,
            'feed_id': req.feed.id
        })
        fetch({
            'require': true
        })
        .then(function(article) {
            req.article = article;
            next();
        })
        .catch(next);
});

app.route('/api/v1/sessions')
    .post(function(req, res, next) {

        User
            .where({
                'email': req.body.email
            })
            .fetch({
                'require': true
            })
            .then(function(user) {
                return user.verifyPassword(req.body.password);
            })
            .then(function(user) {
                return user.updateLastSignIn();
            })
            .then(function(user) {
                req.session.user_id = user.id;
                res.cookie('user_id', user.id);
                res.send(user);
            })
            .catch(next);

    })
    .delete(function(req, res, next) {
        delete req.session.user_id;
        res.clearCookie('user_id');
        res.status(200).end();
    });

app.route('/api/v1/me')
    .get(function(req, res, next) {
        res.send(req.user);
    });

app.route('/api/v1/feeds')
    .get(function(req, res, next) {
        Feed
            .where({
                'user_id': req.user.id
            })
            .fetchAll()
            .then(function(feeds) {
                res.send(feeds);
            })
            .catch(next);
    });

app.route('/api/v1/feeds/:feed_id/articles')
    .get(function(req, res, next) {
        req.feed
            .refresh()
            .then(function(articles) {
                return res.send(articles);
            })
            .catch(next);
    });

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({
        'error': err.toString()
    });
});

module.exports = app;
