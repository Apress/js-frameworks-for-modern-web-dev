'use strict';

var path = require('path');
var dbPath = path.join(__dirname, '..', '..', 'db.sqlite');

var knex = require('knex')({
    'client': 'sqlite3',
    'debug': false,
    'connection': {
        'filename': dbPath
    }
});

module.exports = knex;
