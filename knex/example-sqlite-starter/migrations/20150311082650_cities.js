'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('cities', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.integer('state_id').unsigned().references('states.id').notNullable();
        table.string('name').notNullable();
        table.string('postal_code').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cities');
};
