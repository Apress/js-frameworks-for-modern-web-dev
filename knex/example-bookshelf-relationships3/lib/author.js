'use strict';

var bookshelf = require('./bookshelf');

/**
 * @class Author
 */
var Author = bookshelf.Model.extend({
    'tableName': 'authors',
    'idAttribute': 'id',
    'books': function() {
        return this.belongsToMany(require('./book'));
    }
});

module.exports = Author;
