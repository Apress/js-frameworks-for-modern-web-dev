module.exports = function(grunt) {

    grunt.config('list-files', {
        'images': {
            'files': [
                {
                    'cwd': 'public',
                    'src': ['**/*.jpg', '**/*.png'],
                    'dest': 'tmp',
                    'expand': true
                }
            ]
        }
    });

    grunt.registerMultiTask('list-files', function() {
        this.files.forEach(function(files) {
            grunt.log.writeln('Source:', files.src);
            grunt.log.writeln('Destination:', files.dest);
        });
    });

};
