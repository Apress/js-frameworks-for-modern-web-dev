'use strict';

var Promise = require('bluebird');
var bookshelf = require('../../../../lib/bookshelf');
var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    /**
     * Creates a user (along with a corresponding profile)
     */
    bookshelf.transaction(function(trx) {

        return models.User.forge(req.body)
            .save(null, {
                'transacting': trx
            })
            .then(function(user) {
                return Promise.all([
                    user,
                    user.related('profile').create(null, {
                        'transacting': trx
                    })
                ]);
            })
            .spread(function(user, profile) {
                return user;
            });

    }).then(function(user) {
        res.send(user);
    }).catch(next);

};
