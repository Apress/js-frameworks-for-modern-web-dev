'use strict';

var glob = require('glob');

module.exports = function(grunt) {

    grunt.registerTask('list-files', function() {

        /**
         * Grunt will wait until we call the `done` function to indicate that our
         * asynchronous task is complete.
         */
        var done = this.async();

        glob('*', function(err, files) {
            if (err) {
                grunt.fail.fatal(err);
            }
            grunt.log.writeln(files);
            done();
        });

    });

};
