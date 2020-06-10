module.exports = function(grunt) {

    grunt.registerTask('browserify', function() {

        var done = this.async();
        var browserify = require('browserify');
        var path = require('path');
        var fs = require('fs');
        var target = path.join(__dirname, '../public/dist/app.js');
        var src = path.join(__dirname, '../public/app/index.js');

        grunt.file.mkdir(path.dirname(target));

        var b = browserify(src);
        b.bundle(function(err, data) {
            if (err) {
                console.log('Error', err);
                return done(false);
            }
            fs.writeFileSync(target, data);
            done();
        });

    });

};
