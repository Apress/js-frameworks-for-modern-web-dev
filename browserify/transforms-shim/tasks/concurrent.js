'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-concurrent');

    grunt.config('concurrent', {
        'options': {
            'limit': 3
        },
        'serve': {
            'tasks': ['server', 'watch'],
            'options': {
                'logConcurrentOutput': true
            }
        }
    });

};
