'use strict';

var bookshelf = require('bookshelf');
var knex = require('./db');

module.exports = bookshelf(knex);
