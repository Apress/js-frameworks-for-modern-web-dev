'use strict';

module.exports = function(grunt) {

    grunt.config('basic-task', {
        'message': 'Hello, world.'
    });

    grunt.registerTask('basic-task', 'This is an example task.', function() {
        grunt.log.writeln(grunt.config('basic-task.message'));
    });

    grunt.registerTask('default', 'This is the default task.', ['basic-task']);

};
