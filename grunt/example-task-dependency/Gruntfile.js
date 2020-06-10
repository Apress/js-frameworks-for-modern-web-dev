'use strict';

module.exports = function(grunt) {
    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['step-one', 'step-two']);
};
