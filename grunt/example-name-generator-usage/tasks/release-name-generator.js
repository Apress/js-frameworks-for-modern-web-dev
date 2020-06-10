'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-release-name-generator');

    grunt.config('release-name-generator', {
        'options': {
            'category': 'mammals'
        },
        'development': {
            'options': {
                'category': 'lizards'
            }
        },
        'production': {
        }
    });

};
