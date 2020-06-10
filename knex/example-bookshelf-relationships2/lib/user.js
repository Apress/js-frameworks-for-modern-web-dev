'use strict';

var bookshelf = require('./bookshelf');

/**
 * @class User
 */
var User = bookshelf.Model.extend({
    'tableName': 'users',
    'idAttribute': 'id',
    'account': function() {
        return this.belongsTo(require('./account'));
    },
    'profile': function() {
        return this.hasMany(require('./profile'));
    }
});

module.exports = User;
