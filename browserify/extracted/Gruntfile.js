'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        'browserify': {
            'vendor_modules': [
                'angular',
                'bootstrap-sass',
                'jquery',
                'angular-route',
                'angular-sanitize',
                'restangular',
                'jquery.cookie',
                'lodash',
                'underscore.string',
                'lodash-deep'
            ]
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['compass', 'browserify', 'browserify-vendor', 'init-db', 'concurrent']);

};
