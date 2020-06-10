'use strict';

module.exports = function(grunt) {

    grunt.registerTask('browserify', function() {

        var done = this.async();
        var path = require('path');
        var fs = require('fs');
        var src = path.join('public', 'app', 'index.js');
        var target = path.join('public', 'dist', 'app.js');
        var browserify = require('browserify')([
            src
        ]);

        browserify.bundle(function(err, data) {
            if (err) return grunt.fail.fatal(err);
            grunt.file.mkdir(path.join('public', 'dist'));
            fs.writeFileSync(target, data);
            done();
        });

    });

};
