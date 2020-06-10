'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    var path = require('path');
    var src = path.join('public', 'app', '**', '*');

    grunt.config('watch', {
        'browserify': {
            'files': [
                src
            ],
            'tasks': ['browserify'],
            'options': {
                'spawn': true
            }
        }
    });

};
