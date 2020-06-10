'use strict';

module.exports = function(grunt) {

    /**
     * Inserts seed data into the database (if none already exists)
     *
     * @example $ grunt seed
     */
    grunt.registerTask('seed', function() {

        var done = this.async();

        var knex = require('../lib/knex');

        knex('feeds').select('*')
            .then(function(rows) {
                if (!rows.length) {
                    grunt.util.spawn({
                        'cmd': 'knex',
                        'args': [
                            'seed:run'
                        ]
                    }, function(err, result) {
                        if (err) {
                            return grunt.fail.fatal(err);
                        }
                        grunt.verbose.writeln(result);
                        done();
                    });
                } else {
                    done();
                }
            })
            .catch(grunt.fail.fatal);

    });

};
