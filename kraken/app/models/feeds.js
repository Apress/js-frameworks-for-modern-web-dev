'use strict';

var bookshelf = require('../lib/bookshelf');
var Promise = require('bluebird');
var feedRead = require('feed-read');

var Feed = bookshelf.Model.extend({
    'tableName': 'feeds',
    'getArticles': function() {
        var self = this;
        return Promise.fromNode(function(callback) {
            feedRead(self.get('url'), callback);
        });
    }
});

module.exports = Feed;
