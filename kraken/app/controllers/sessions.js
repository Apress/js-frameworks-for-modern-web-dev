'use strict';

module.exports = function(router) {

    router.route('/')
        .post(function(req, res, next) {

            var User = require('../models/users');
            User
                .where({
                    'email': req.body.email
                })
                .fetch({
                    'require': true
                })
                .then(function(user) {
                    return user.verifyPassword(req.body.password);
                })
                .then(function(user) {
                    req.session.user_id = user.id;
                    res.redirect('/welcome');
                })
                .catch(next);

        });

};
