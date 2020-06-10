'use strict';

module.exports = function(grunt) {

    grunt.registerTask('init-db', function() {
        if (grunt.file.exists('db.sqlite')) return;
        grunt.task.run(['migrate', 'seed']);
    });

};
