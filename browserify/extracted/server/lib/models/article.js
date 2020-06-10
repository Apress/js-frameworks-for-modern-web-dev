'use strict';

var bookshelf = require('../bookshelf');
var Promise = require('bluebird');

var Article = bookshelf.Model.extend({
    'tableName': 'articles',
    'feed': function() {
        return this.belongsTo(require('./feed'));
    }
});

module.exports = Article;
