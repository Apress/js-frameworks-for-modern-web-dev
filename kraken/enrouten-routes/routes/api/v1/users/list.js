'use strict';

var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    models.User.fetchAll()
        .then(function(users) {
            res.send(users);
        })
        .catch(next);

};
