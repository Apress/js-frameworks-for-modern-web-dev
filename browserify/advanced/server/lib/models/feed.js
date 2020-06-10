'use strict';

var knex = require('../knex');
var bookshelf = require('../bookshelf');
var Promise = require('bluebird');
var feedRead = require('feed-read');
var moment = require('moment');
var debug = require('debug')('app');
var _ = require('lodash');

var Feed = bookshelf.Model.extend({
    'tableName': 'feeds',
    'articles': function() {
        return this.hasMany(require('./article'));
    },
    'refresh': function() {
        var self = this;
        return Promise.resolve()
            .then(function() {
                if (!self.get('refreshed_at')) {
                    return self._refresh();
                } else {
                    var lastRefreshed = moment(self.get('refreshed_at', 'YYYY-MM-DD hh:mm:ss'));
                    var now = moment();
                    var refreshDiff = now.diff(lastRefreshed, 'minutes');
                    debug('Feed - %s - was last refreshed %s minute(s) ago', self.get('name'), refreshDiff);
                    if (refreshDiff >= 30) {
                        return self._refresh();
                    } else {
                        return Promise.resolve();
                    }
                }
            })
            .then(function() {
                return self.load('articles');
            })
            .then(function() {
                return self.related('articles');
            });
    },
    '_refresh': function() {
        var self = this;
        debug('Refreshing articles for feed: %s', this.get('name'));
        return Promise
            .fromNode(function(callback) {
                feedRead(self.get('url'), callback);
            })
            .then(function(articles) {
                articles = articles.map(function(article) {
                    article = _.pick(article, ['title', 'content', 'published', 'author', 'link']);
                    article.published_at = moment(article.published).format('YYYY-MM-DD hh:mm:ss');
                    article.feed_id = self.id;
                    delete article.published;
                    return article;
                });
                return Promise.settle(articles.map(function(article) {
                    return knex('articles').insert(article);
                }));
            })
            .then(function(tasks) {
                var insertCount = _.filter(tasks, function(task) {
                    if (task.isFulfilled()) return true;
                }).length;
                debug('Inserted %s articles', insertCount);
                self.set('refreshed_at', moment().format('YYYY-MM-DD hh:mm:ss'));
                return self.save();
            });
    }
});

module.exports = Feed;
