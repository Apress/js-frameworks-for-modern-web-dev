'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-open');

    grunt.config.init({
        'approot': __dirname,
        'server': {
            'port': <%= port %>
        },
        'concat': {
            'options': {
                'separator': ';'
            },
            'app': {
                'dest': 'public/dist/libs.js',
                'src': [
                    'public/bower_components/angular/angular.js',
                    'public/bower_components/angular-route/angular-route.js',
                    'public/bower_components/jquery/dist/jquery.js',
                    'public/bower_components/bootstrap/dist/js/bootstrap.js'
                ]
            }
        },
        'compass': {
            'app': {
                'options': {
                    'sassDir': 'scss',
                    'cssDir': 'public/css'
                }
            }
        },
        'concurrent': {
            'app': {
                'tasks': [
                    'server', 'watch', 'open'
                ],
                'options': {
                    'logConcurrentOutput': true
                }
            }
        },
        'watch': {
            'app': {
                'files': [
                    'public/app/**/*'
                ],
                'tasks': ['browserify'],
                'options': {
                    'spawn': true
                }
            },
            'libs': {
                'files': [
                    'Gruntfile.js'
                ],
                'tasks': ['concat'],
                'options': {
                    'spawn': true
                }
            },
            'css': {
                'files': [
                    'scss/**/*'
                ],
                'tasks': ['compass'],
                'options': {
                    'spawn': true
                }
            }
        },
        'open': {
            'app': {
                'path': 'http://localhost:<%= port %>'
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['concat', 'compass', 'browserify', 'concurrent']);

};
