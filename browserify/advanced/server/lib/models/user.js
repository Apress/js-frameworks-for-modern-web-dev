'use strict';

var Promise = require('bluebird');
var bookshelf = require('../bookshelf');
var moment = require('moment');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = bookshelf.Model.extend({
    'tableName': 'users',
    'idAttribute': 'id',
    'feeds': function() {
        return this.hasMany(require('./feeds'));
    },
    /**
     * Verify that a specified password matches the hashed version recorded for this user.
     */
    'verifyPassword': function(password) {
        var self = this;
        return bcrypt.compareAsync(password, this.get('password'))
            .then(function(result) {
                if (!result) {
                    throw new Error('Password verification failed');
                }
                return self;
            });
    },
    'toJSON': function() {
        var data = bookshelf.Model.prototype.toJSON.apply(this, arguments);
        delete data.password;
        return data;
    },
    'updateLastSignIn': function() {
        this.set('last_signin', moment().format('YYYY-MM-DD hh:mm:ss'));
        return this.save();
    }
});
