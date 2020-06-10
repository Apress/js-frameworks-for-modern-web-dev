'use strict';

var path = require('path');
var knex = require('knex')({
    'client': 'sqlite3',
    'connection': {
        'filename': path.join(APPROOT, 'db.sqlite')
    }
});

module.exports = knex;
