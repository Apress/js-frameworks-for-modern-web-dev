'use strict';

/**
 * Middleware function for authorizing incoming requests.
 * Disabled for demo purposes.
 */
module.exports = function() {

    return function(req, res, next) {

        var User = require('../../models/users');

        User
            .where({
                'id': req.session.user_id
            })
            .fetch({
                'require': false // Should be true, if auth was really enabled
            })
            .then(function(user) {
                req.user = user;
                next();
            })
            .catch(function(err) {
                // return res.redirect('/');  Don't just allow pass-thru, is auth should be enabled
                next();
            });

    };

};
