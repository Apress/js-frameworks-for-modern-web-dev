'use strict';

var models = require('../../../../lib/models');

module.exports = function(req, res, next) {

    models.Account.fetchAll()
        .then(function(accounts) {
            res.send(accounts);
        })
        .catch(next);

};
