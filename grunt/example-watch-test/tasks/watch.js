'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.config('watch', {
		'scss': {
			'files': [
				'src/**/*.js'
			],
			'tasks': ['mochaTest'],
			'options': {
				'spawn': true
			}
		}
	});

};
