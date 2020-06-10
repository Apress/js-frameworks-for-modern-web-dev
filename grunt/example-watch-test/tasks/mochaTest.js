'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.config('mochaTest', {
        'test': {
            'options': {
                'reporter': 'spec'
            },
            'src': ['test/**/*.js']
        }
    });

};
