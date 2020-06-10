'use strict';

module.exports = function(grunt) {

    grunt.config('list-files', {
        'images': {
            'src': ['public/**/*.jpg', 'public/**/*.png']
        }
    });

    grunt.registerMultiTask('list-files', function() {
        this.files.forEach(function(files) {
            grunt.log.writeln('Source:', files.src);
        });
    });

};
