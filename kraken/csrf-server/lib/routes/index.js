'use strict';

module.exports = function(router) {

    router.route('/')
        .get(function(req, res, next) {

            res.render('login');

        });

    router.route('/sessions')
        .post(function(req, res, next) {

            var User = require('../models/user');
            User.where({
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

    router.route('/welcome')
        .get(function(req, res, next) {
            res.render('welcome', {
                'user': req.user.toJSON()
            });
        });

    router.route('/transfer-funds')
        .post(function(req, res, next) {
            res.render('transfer-funds', {
                'user': req.user.toJSON()
            });
        });

    router.route('/logout')
        .get(function(req, res, next) {
            if (req.session.user_id) delete req.session.user_id;
            res.redirect('/');
        });

};
