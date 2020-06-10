'use strict';

module.exports = function(grunt) {

    grunt.registerTask('server', function() {
        var done = this.async();
        var app = require('../server');
    });

};
