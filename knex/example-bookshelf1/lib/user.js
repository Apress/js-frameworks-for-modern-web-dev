'use strict';

var knex = require('./db');
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');

/**
 * @class User
 */
var User = bookshelf.Model.extend({
    'tableName': 'users',
    'idAttribute': 'id', // The primary key for our table. Defaults to: 'id'
    'initialize': function() {
    	this.on('saving', this._validateSave);
    },
    'sendEmail': function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                console.log('Email sent.'); // not really
                resolve();
            }, 2000);
        });
    },
    '_validateSave': function() {
        var self = this;
        return Promise.resolve().then(function() {
            if (self.get('email').indexOf('hotmail.com') >= 0) {
                throw new Error('Hotmail email addresses are not allowed.');
            }
        });
    }
}, {

    /**
     * Returns a collection containing users who have signed in within the
     * last 24 hours.
     */
    'getRecent': function() {
        return User.where('last_signin', '>=', knex.raw("date('now', '-1 day')")).fetch();
    }

});

module.exports = User;
