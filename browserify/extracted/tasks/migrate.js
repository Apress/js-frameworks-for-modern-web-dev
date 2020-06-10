'use strict';

module.exports = function(grunt) {

    grunt.registerTask('migrate', function() {
        var done = this.async();
        grunt.util.spawn({
            'cmd': 'knex',
            'args': ['migrate:latest']
        }, function(err, result, code) {
            if (err) return grunt.fail.fatal(err);
            if (code) return grunt.fail.fatal('knex migrate:latest failed with status code: ' + code);
            grunt.log.writelns(result);
            done();
        });
    });

};
