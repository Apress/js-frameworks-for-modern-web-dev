'use strict';

module.exports = function(router) {

    var models = require('../lib/models');

    router.param('user_id', function(req, res, next, id) {

        models.User.where({
            'id': id
        }).fetch({
            'require': true
        }).then(function(user) {
            req.user = user;
            next();
        }).catch(function(err) {
            return res.status(404).end();
        });

    });

    router.param('account_id', function(req, res, next, id) {

        models.Account.where({
            'id': id
        }).fetch({
            'require': true
        }).then(function(account) {
            req.account = account;
            next();
        }).catch(function(err) {
            return res.status(404).end();
        });

    });

};
