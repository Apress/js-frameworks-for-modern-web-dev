'use strict';

var knex = require('knex')({
    'client': 'sqlite3',
    'connection': {
        'filename': 'db.sqlite'
    }
});

module.exports = knex;
