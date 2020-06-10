'use strict';

var multiline = require('multiline');

exports.up = function(knex, Promise) {

    var sql = multiline.stripIndent(function() {/*
        CREATE TABLE states (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            name varchar(255) NOT NULL,
            created_at datetime NOT NULL DEFAULT(CURRENT_TIMESTAMP)
        );
    */});

    return knex.schema.raw(sql);

};

exports.down = function(knex, Promise) {
    return knex.schema.raw('DROP TABLE states;');
};
