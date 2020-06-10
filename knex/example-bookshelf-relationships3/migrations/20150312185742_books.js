'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.string('name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
