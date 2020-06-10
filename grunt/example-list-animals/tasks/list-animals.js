'use strict';

module.exports = function(grunt) {

    /**
     * Our multi-task's configuration object. In this example, 'mammals'
     * and 'birds' each represent what Grunt refers to as a 'target.'
     */
    grunt.config('list-animals', {
        'mammals': {
            'animals': ['Cat', 'Zebra', 'Koala', 'Kangaroo']
        },
        'birds': {
            'animals': ['Penguin', 'Sparrow', 'Eagle', 'Parrot']
        }
    });

    grunt.registerMultiTask('list-animals', function() {
        grunt.log.writeln('Target:', this.target);
        grunt.log.writeln('Data:', this.data);
    });

};
