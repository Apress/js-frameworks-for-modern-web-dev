'use strict';

module.exports = function(grunt) {

    grunt.config('test', {
        'banner': '<%= pkg.name %>-<%= pkg.version %>'
    });

    grunt.registerTask('test', function() {
        grunt.log.writeln(grunt.config('test.banner'));
    });

};
