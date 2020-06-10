'use strict';

var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    models.Profile.forge(req.body).save()
        .then(function(profile) {
            res.send(profile);
        })
        .catch(next);

};
