'use strict';

var bookshelf = require('../../bookshelf');

/**
 * @class Account
 */
var Account = bookshelf.Model.extend({
    'tableName': 'accounts',
    'idAttribute': 'id',
    'users': function() {
        return this.hasMany(require('../user'));
    }
});

module.exports = Account;
