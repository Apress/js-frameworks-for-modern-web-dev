'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('accounts', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.decimal('funds', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('accounts');
};
