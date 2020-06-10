'use strict';

module.exports = function(grunt) {
    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['compass', 'browserify', 'init-db', 'concurrent']);
};
