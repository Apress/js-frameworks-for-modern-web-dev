'use strict';

module.exports = function(grunt) {

    grunt.registerTask('browserify', function() {

        var done = this.async();
        var path = require('path');
        var fs = require('fs');
        var target = path.join('public', 'dist', 'app.js');
        var vendorModules = grunt.config.get('browserify.vendor_modules') || [];

        var browserify = require('browserify')([
            path.join('app', 'index.js')
        ], {
            'paths': [
                'app'
            ],
            'fullPaths': true,
            'bundleExternal': true
        });

        vendorModules.forEach(function(vm) {
            grunt.log.writelns('Excluding module from application bundle: %s', vm);
            browserify.exclude(vm);
        });

        browserify.bundle(function(err, data) {
            if (err) return grunt.fail.fatal(err);
            grunt.file.mkdir(path.join('public', 'dist'));
            fs.writeFileSync(target, data);
            grunt.task.run('disc');
            done();
        });

    });

};
