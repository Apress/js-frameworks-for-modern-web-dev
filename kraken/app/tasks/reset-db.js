'use strict';

var async = require('async');

module.exports = function(grunt) {

    grunt.registerTask('reset-db', 'Resets the SQLite DB to its initial state', function() {

        var done = this.async();

        if (grunt.file.exists('db.sqlite')) {
            grunt.file.delete('db.sqlite');
        }

        async.series([
            function(cb) {
                grunt.util.spawn({
                    'cmd': 'knex',
                    'args': [
                        'migrate:latest'
                    ]
                }, function(err, result, code) {
                    return cb(err);
                });
            },
            function(cb) {
                grunt.util.spawn({
                    'cmd': 'knex',
                    'args': [
                        'seed:run'
                    ]
                }, function(err, result, code) {
                    return cb(err);
                });
            }
        ], function(err) {
            if (err) return grunt.fail.fatal(err.toString());
            done();
        });

    });

};
