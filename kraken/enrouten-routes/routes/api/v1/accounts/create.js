'use strict';

var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    models.Account.forge(req.body).save()
        .then(function(account) {
            res.send(account);
        })
        .catch(next);

};
