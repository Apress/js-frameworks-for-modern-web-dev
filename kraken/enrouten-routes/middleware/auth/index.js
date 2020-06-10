'use strict';

var models = require('../../lib/models');

module.exports = function(req, res, next) {

    if (!req.headers.token) return next(new Error('Authorization Failed: No token present'));

    models.User.where({
        'token': req.headers.token
    }).fetch({
        'require': true
    }).then(function(user) {
        req.user = user;
        next();
    }).catch(next);

};
