'use strict';

module.exports = function(grunt) {

    grunt.registerTask('server', function() {
        var done = this.async();
        var open = require('open');
        var app = require('../server');
        app.listen(8000);
        grunt.log.oklns('API is listening at: http://localhost:8000');
        open('http://localhost:8000');
    });

};
