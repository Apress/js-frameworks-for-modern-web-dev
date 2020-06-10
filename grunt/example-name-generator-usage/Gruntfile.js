'use strict';

module.exports = function(grunt) {
    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['release-name-generator']);
};
