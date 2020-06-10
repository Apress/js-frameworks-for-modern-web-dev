'use strict';

var _ = require('lodash');

module.exports = function(router) {

    router.route('/')
        .get(function(req, res, next) {

            req.user
                .load('feeds')
                .then(function() {
                    return req.user.related('feeds').invokeThen('getArticles');
                })
                .then(function(articles) {
                    var user = req.user.toJSON();
                    user.feeds = _.map(user.feeds, function(feed, i) {
                        feed.articles = articles[i];
                        return feed;
                    });
                    return res.render('welcome', {
                        'user': user,
                        'articles': function(chunk, context, bodies, params) {
                            var result = [];
                            _.each(this.user.feeds, function(feed) {
                                _.each(feed.articles, function(article) {
                                    article.feed = _.pick(feed, ['id', 'name', 'url']);
                                    result.push(article);
                                });
                            });
                            return result;
                        }
                    });
                })
                .catch(next);

        });

};
