'use strict';

var _ = require('lodash');
var path = require('path');

module.exports = function(router) {

	var accounts = require(path.join(APPROOT, 'models', 'accounts'));

	/**
	 * @route /api/v1/accounts
	 */
    router.route('/')
        .get(function(req, res, next) {
            res.send(accounts);
        });

	/**
	 * @route /api/v1/accounts/:account_id
	 */
    router.route('/:account_id')
        .get(function(req, res, next) {
			var account = _.findWhere(accounts, {
				'id': parseInt(req.params.account_id, 10)
			});
			if (!account) return next(new Error('Account not found'));
            res.send(account);
        });

};
