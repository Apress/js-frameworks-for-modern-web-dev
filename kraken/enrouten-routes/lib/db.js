'use strict';

var path = require('path');

var knex = require('knex')({
    'client': 'sqlite3',
    'connection': {
        'filename': path.resolve(__dirname, '../db.sqlite3')
    }
});

module.exports = knex;
