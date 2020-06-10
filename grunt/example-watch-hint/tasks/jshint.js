'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.config('jshint', {
		'options': {
			'globalstrict': true,
			'node': true,
			'scripturl': true,
			'browser': true,
			'jquery': true
		},
		'all': [
			'src/**/*.js'
		]
	});

};
