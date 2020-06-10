'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.config('uglify', {
        'options': {
            'banner': '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        'dist': {
            'files': {
                'dist/app.min.js': ['src/index.js']
            }
        }
    });

};
