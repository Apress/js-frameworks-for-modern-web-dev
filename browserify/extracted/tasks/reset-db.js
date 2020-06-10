'use strict';

module.exports = function(grunt) {

    grunt.registerTask('reset-db', function() {
        if (grunt.file.exists('db.sqlite')) {
            grunt.file.delete('db.sqlite');
        }
        grunt.task.run(['migrate', 'seed']);
    });

};
