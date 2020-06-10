'use strict';

var _ = require('lodash');
var path = require('path');

module.exports = function(router) {

	var users = require(path.join(APPROOT, 'models', 'users'));

	/**
	 * @route /api/v1/users
	 */
    router.route('/')
        .get(function(req, res, next) {
            res.send(users);
        });

	/**
	 * @route /api/v1/users/:user_id
	 */
    router.route('/:user_id')
        .get(function(req, res, next) {
			var user = _.findWhere(users, {
				'id': parseInt(req.params.user_id, 10)
			});
			if (!user) return next(new Error('user not found'));
            res.send(user);
        });

};
