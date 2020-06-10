'use strict';

module.exports = function(grunt) {
    grunt.config.init({
        'pkg': grunt.file.readJSON('package.json')
    });
    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['test']);
};
