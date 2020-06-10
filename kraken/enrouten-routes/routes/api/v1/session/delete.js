'use strict';

var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    req.user.set('token', null);
    req.user.save()
        .then(function() {
            res.status(200).end();
        })
        .catch(next);

};
