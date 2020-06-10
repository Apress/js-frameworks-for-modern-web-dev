'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.config('watch', {
		'scss': {
			'files': [
				'scss/**/*'
			],
			'tasks': ['compass'],
			'options': {
				'spawn': true
			}
		}
	});

};
