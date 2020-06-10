'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('authors');
};
