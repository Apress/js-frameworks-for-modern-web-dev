'use strict';

var path = require('path');

module.exports = function(grunt) {

    grunt.registerTask('server', function() {

        var done = this.async();

        var app = require(path.join(
            grunt.config('approot'), 'lib', 'app.js'
        ));

        app.listen(grunt.config('server.port'));

        grunt.log.writeln('Server is now listening on port: %s', grunt.config('server.port'));

    });

};
