'use strict';

var Promise = require('bluebird');
var bookshelf = require('../../bookshelf');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = bookshelf.Model.extend({
    'tableName': 'users',
    'idAttribute': 'id',
    /**
     * Verify that a specified password matches the hashed version recorded for this user.
     */
    'verifyPassword': function(password) {
        var self = this;
        return bcrypt.compareAsync(password, this.get('password'))
            .then(function(result) {
                if (!result) throw new Error('Password verification failed');
                return self;
            });
    }
});
