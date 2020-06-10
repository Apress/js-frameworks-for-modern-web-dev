'use strict';

module.exports = function(grunt) {

    grunt.registerTask('browserify-vendor', function() {

        var done = this.async();
        var path = require('path');
        var fs = require('fs');
        var target = path.join('public', 'dist', 'vendor.js');
        var vendorModules = grunt.config.get('browserify.vendor_modules') || [];

        var browserify = require('browserify')({
            'paths': [
                'app'
            ],
            'fullPaths': true
        });

        vendorModules.forEach(function(vm) {
            browserify.require(vm);
        });

        browserify.bundle(function(err, data) {
            if (err) return grunt.fail.fatal(err);
            grunt.file.mkdir(path.join('public', 'dist'));
            fs.writeFileSync(target, data);
            done();
        });

    });

};
