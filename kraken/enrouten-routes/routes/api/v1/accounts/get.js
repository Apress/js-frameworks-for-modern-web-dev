'use strict';

module.exports = function(req, res, next) {
    res.send(req.account);
};
