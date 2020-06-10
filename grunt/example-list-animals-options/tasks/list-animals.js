'use strict';

module.exports = function(grunt) {

    grunt.config('list-animals', {
        'options': {
            'format': 'array'
        },
        'mammals': {
            'options': {
                'format': 'json'
            },
            'animals': ['Cat', 'Zebra', 'Koala', 'Kangaroo']
        },
        'birds': {
            'animals': ['Penguin', 'Sparrow', 'Eagle', 'Parrot']
        }
    });

    grunt.registerMultiTask('list-animals', function() {

        var options = this.options();

        switch (options.format) {
            case 'array':
                grunt.log.writeln(this.data.animals);
            break;
            case 'json':
                grunt.log.writeln(JSON.stringify(this.data.animals));
            break;
            default:
                grunt.fail.fatal('Unknown format: ' + options.format);
            break;
        }

    });

};
