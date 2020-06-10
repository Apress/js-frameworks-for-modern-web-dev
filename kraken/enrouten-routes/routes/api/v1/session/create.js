'use strict';

var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    models.User.where({
        'email': req.body.email
    }).fetch({
        'require': true
    }).then(function(user) {
        return user.verifyPassword(req.body.password);
    }).then(function(user) {
        return user.generateSessionToken();
    }).then(function(user) {
        res.send({
            'token': user.get('token')
        });
    }).catch(next);

};
