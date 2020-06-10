'use strict';

module.exports = function(grunt) {

    grunt.registerTask('browserify', function() {

        var done = this.async();

        grunt.util.spawn({
            'cmd': 'browserify',
            'args': [
                'public/app/index.js',
                '-o',
                'public/dist/app.js'
            ]
        }, function(error, result, code) {
            if (code !== 0) {
                grunt.log.error(result);
                return done(false);
            }
            return done();
        });

    });

};
