'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.config('watch', {
        'compass': {
            'files': ['scss/**/*.scss'],
            'tasks': ['compass'],
            'options': {
                'spawn': true
            }
        },
        'browserify': {
            'files': [
                'node_modules/app/**/*'
            ],
            'tasks': ['browserify'],
            'options': {
                'spawn': true
            }
        }
    });

};
