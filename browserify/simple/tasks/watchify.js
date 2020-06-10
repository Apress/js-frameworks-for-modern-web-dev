'use strict';

module.exports = function(grunt) {

    grunt.registerTask('watchify', function() {

        var done = this.async();
        var browserify = require('browserify');
        var watchify = require('watchify');
        var fs = require('fs');
        var path = require('path');
        var src = path.join('public', 'app', 'index.js');
        var target = path.join('public', 'dist', 'app.js');
        var targetDir = path.join('public', 'dist');

        var browserify = browserify({
            'cache': {},
            'packageCache': {}
        });
        browserify = watchify(browserify);
        browserify.add(src);

        var compile = function(err, data) {
            if (err) return grunt.log.error(err);
            if (!data) return grunt.log.error('No data');
            grunt.file.mkdir(targetDir);
            fs.writeFileSync(target, data);
        };

        browserify.bundle(compile);

        browserify.on('update', function() {
            browserify.bundle(compile);
        });

        browserify.on('log', function(msg) {
            grunt.log.oklns(msg);
        });

    });

};
