'use strict';

module.exports = function(grunt) {

    grunt.registerTask('disc', function() {

        var done = this.async();
        var disc = require('disc');
        var fs = require('fs');
        var path = require('path');

        fs.createReadStream(path.join('public', 'dist', 'app.js'))
            .pipe(disc())
            .pipe(fs.createWriteStream(path.join('public', 'disc.html')))
            .once('close', function() {
                grunt.log.oklns('Browserify dependency visualization created: http://localhost:8000/disc.html');
                done();
            });

    });

};
