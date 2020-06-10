'use strict';

module.exports = function(grunt) {

    grunt.registerTask('seed', function() {
        var done = this.async();
        grunt.util.spawn({
            'cmd': 'knex',
            'args': ['seed:run']
        }, function(err, result, code) {
            if (err) return grunt.fail.fatal(err);
            if (code) return grunt.fail.fatal('knex seed:run failed with status code: ' + code);
            grunt.log.writelns(result);
            done();
        });
    });

};
