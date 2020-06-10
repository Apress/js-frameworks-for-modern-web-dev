'use strict';

var knex = require('./db');
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
