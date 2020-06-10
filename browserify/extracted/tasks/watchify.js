'use strict';

module.exports = function(grunt) {

    grunt.registerTask('watchify', function() {

        var done = this.async();
        var browserify = require('browserify');
        var watchify = require('watchify');
        var fs = require('fs');
        var path = require('path');
        var src = path.join('app', 'index.js');
        var target = path.join('public', 'dist', 'app.js');
        var targetDir = path.join('public', 'dist');

        var b = browserify({
            'cache': {},
            'packageCache': {},
            'paths': [
                'app'
            ],
            'fullPaths': true
        });
        b = watchify(b);
        b.add(src);

        var compile = function(err, data) {
            if (err) return grunt.log.error(err);
            if (!data) return grunt.log.error('No data');
            grunt.file.mkdir(targetDir);
            fs.writeFileSync(target, data);
        };

        b.bundle(compile);

        b.on('update', function() {
            grunt.log.writelns('Browserify detected update...');
            b.bundle(compile);
        });

        b.on('log', function(msg) {
            grunt.log.oklns(msg);
        });

    });

};
