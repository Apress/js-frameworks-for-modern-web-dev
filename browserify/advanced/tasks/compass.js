'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.config('compass', {
        'all': {
            'options': {
                'httpPath': '/',
                'cssDir': 'public/css',
                'sassDir': 'scss',
                'imagesDir': 'public/images',
                'relativeAssets': true,
                'outputStyle': 'compressed',
                'importPath': [
                    'node_modules'
                ]
            }
        }
    });

};
