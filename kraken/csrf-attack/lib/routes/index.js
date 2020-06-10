'use strict';

module.exports = function(router) {

    router.route('/')
        .get(function(req, res, next) {
            res.render('index');
        });

};
