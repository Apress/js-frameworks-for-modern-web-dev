'use strict';

var bookshelf = require('./bookshelf');

/**
 * @class User
 */
var User = bookshelf.Model.extend({
    'tableName': 'users',
    'idAttribute': 'id',
    'profile': function() {
        return this.hasMany(require('./profile'));
    }
});

module.exports = User;
