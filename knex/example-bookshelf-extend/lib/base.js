'use strict';

var bookshelf = require('./bookshelf');

/**
 * @class Base
 */
var Base = bookshelf.Model.extend({
    'foo': function() {
        console.log('bar', this.toJSON());
    }
});

module.exports = Base;
