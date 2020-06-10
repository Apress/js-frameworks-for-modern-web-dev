'use strict';

var bookshelf = require('../../bookshelf');

/**
 * @class Profile
 */
var Profile = bookshelf.Model.extend({
    'tableName': 'profiles',
    'idAttribute': 'id',
    'user': function() {
        return this.belongsTo(require('../user'));
    }
});

module.exports = Profile;
