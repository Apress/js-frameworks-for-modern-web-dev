var assert = require('assert');
var App = require('../src/app');

describe('App', function() {

    it('Should add numbers correctly', function() {
        var app = new App();
        assert(app.add(5, 5) === 10, '5 + 5 should equal 10');
    });

});
