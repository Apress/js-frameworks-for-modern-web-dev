'use strict';

var Feed = require('../models/feeds');

module.exports = function(router) {

    router.param('feed_id', function(req, res, next, id) {
        Feed.where({
            'id': id
        }).fetch({
            'require': true
        }).then(function(feed) {
            req.feed = feed;
            next();
        }).catch(next);
    });

    /**
     * @url http://localhost:8000/feeds
     */
    router.route('/')
        .get(function(req, res, next) {
            return Feed.where({})
                .fetchAll()
                .then(function(feeds) {
                    if (req.accepts('html')) {
                        return res.render('feeds', {
                            'feeds': feeds.toJSON()
                        });
                    } else if (req.accepts('json')) {
                        return res.send(feeds);
                    } else {
                        throw new Error('Unknown `Accept` value: ' + req.headers.accept);
                    }

                })
                .catch(next);
        });

    /**
     * @url http://localhost:8000/feeds/:feed_id
     */
    router.route('/:feed_id')
        .get(function(req, res, next) {
            res.send(req.feed);
        });

    /**
     * @url http://localhost:8000/feeds/:feed_id/articles
     */
    router.route('/:feed_id/articles')
        .get(function(req, res, next) {
            req.feed.getArticles()
                .then(function(articles) {
                    res.send(articles);
                })
                .catch(next);
        });

};
