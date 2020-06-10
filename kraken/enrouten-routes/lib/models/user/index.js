'use strict';

var Promise = require('bluebird');
var crypto = Promise.promisifyAll(require('crypto'));
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var bookshelf = require('../../bookshelf');

/**
 * @class User
 */
var User = bookshelf.Model.extend({
    'tableName': 'users',
    'idAttribute': 'id',
    'account': function() {
        return this.belongsTo(require('../account'));
    },
    'profile': function() {
        return this.hasMany(require('../profile'));
    },
    /**
     * Assigns a new session token to the user.
     */
    'generateSessionToken': function() {
        var self = this;
        var token;
        return crypto.randomBytesAsync(48)
            .then(function(data) {
                token = data.toString('hex');
                self.set('token', token);
                return self.save();
            });
    },
    /**
     * Sets the user's password.
     */
    'setPassword': function(password) {
        var self = this;
        return Promise.resolve()
            .then(function() {
                if (!password) throw new Error('Password is required');
                return User.generatePasswordHash(password)
                    .then(function(hash) {
                        self.set({
                            'password': hash
                        });
                        return self.save();
                    });
            });
    },
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
    },
    'toJSON': function() {
        var data = bookshelf.Model.prototype.toJSON.apply(this, arguments);
        delete data.password;
        delete data.token;
        return data;
    }
}, {
    /**
     * Generates a new password hash, given a password.
     */
    'generatePasswordHash': function(password) {
        var self = this;
        return Promise.resolve()
            .then(function() {
                if (!password) throw new Error('Password is required');
                return bcrypt.genSaltAsync(10);
            })
            .then(function(salt) {
                return bcrypt.hashAsync(password, salt);
            });
    }
});

module.exports = User;
