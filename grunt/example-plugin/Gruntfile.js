'use strict';

module.exports = function(grunt) {

    grunt.config('file-report', {
        'options': {
        },
        'public': {
            'src': ['public/**/*']
        },
        'images': {
            'src': ['public/**/*.jpg', 'public/**/*.png', 'public/**/*.gif']
        }
    });

    grunt.loadNpmTasks('grunt-file-reporter');

    grunt.registerTask('default', ['file-report']);

};
