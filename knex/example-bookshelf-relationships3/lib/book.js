'use strict';

var bookshelf = require('./bookshelf');

/**
 * @class Book
 */
var Book = bookshelf.Model.extend({
    'tableName': 'books',
    'idAttribute': 'id',
    'authors': function() {
        return this.belongsToMany(require('./author'));
    }
});

module.exports = Book;
