'use strict';

module.exports = function(router) {

	router.route('/')
		.get(function(req, res, next) {
			res.send('Hello, world.');
		});

	router.route('/api/v1/colors')
		.get(function(req, res, next) {
			res.send([
				'blue', 'green', 'red', 'orange', 'white'
			]);
		});

};
