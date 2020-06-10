'use strict';

var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    models.Profile.fetchAll()
        .then(function(profiles) {
            res.send(profiles);
        })
        .catch(next);

};
