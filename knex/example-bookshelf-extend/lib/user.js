'use strict';

var Base = require('./base');

/**
 * @class User
 */
var User = Base.extend({
    'tableName': 'users',
});

module.exports = User;
