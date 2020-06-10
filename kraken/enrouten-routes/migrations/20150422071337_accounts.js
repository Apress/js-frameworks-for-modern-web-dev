'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('accounts', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.string('name').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('accounts');
};
